import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  private readonly expirationDate: Date;
  constructor(private readonly userService: UsersService) {
    this.expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  // Current user
  @ApiOperation({ summary: 'Current user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({ status: 200, type: '' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized Invalid token type' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  public async currentUser(@Req() req: MyRequest, @Res() res: Response) {
    const data = await this.userService.current(req.user.email);
    res.cookie('refreshToken', data.refreshToken, {
      expires: this.expirationDate,
      httpOnly: true,
    });
    res.send({ accessToken: data.accessToken, user: data.user });
  }

  // Update user
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({ status: 200, type: '' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  public async updateUser(
    @Req() req: MyRequest,
    @Res() res: Response,
    @Body() body: UpdateUserDto,
  ) {
    const data = await this.userService.update(req.user.id, body);
    res.cookie('refreshToken', data.refreshToken, {
      expires: this.expirationDate,
      httpOnly: true,
    });
    res.send({ accessToken: data.accessToken, user: data.user });
  }
}
