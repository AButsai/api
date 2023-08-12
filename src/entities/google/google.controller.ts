import { AuthResponseDto } from '@entities/auth/dto/auth.dto';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { Response } from 'express';
import { GoogleService } from './google.service';

@ApiTags('Google auth')
@Controller('api/google')
export class GoogleController {
  private readonly expirationDate: Date;
  constructor(private readonly googleService: GoogleService) {
    this.expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  @ApiOperation({ summary: 'Google authentication' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  // Google Auth
  @ApiOperation({
    summary: 'Google callback',
  })
  @ApiQuery({
    name: 'userData',
    description: 'User data encoded in URL',
    type: 'string',
    required: true,
    example:
      '{successToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..., user: {id: 1, ...}}',
  })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get('/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: MyRequest, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.googleService.auth(
      req.user.email,
    );
    res.cookie('refreshToken', refreshToken, {
      expires: this.expirationDate,
      httpOnly: true,
    });
    const redirectUrl = `${
      process.env.REDIRECT_TO_SITE_HOME
    }?userData=${encodeURIComponent(JSON.stringify(accessToken))}`;
    res.redirect(redirectUrl);
  }
}
