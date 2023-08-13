import { JwtRefreshGuard } from '@guards/jwtGuard/jwt-refresh.guard';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { Response } from 'express';
import { TokensService } from './tokens.service';

@ApiTags('Tokens')
@Controller('api/tokens')
export class TokensController {
  private readonly expirationDate: Date;
  constructor(private readonly tokensService: TokensService) {
    this.expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  // Refresh token
  @UseGuards(JwtRefreshGuard)
  @Get('refresh-token')
  public async refresh(@Req() req: MyRequest, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.tokensService.generateTokens(req.user);
    res.cookie('refreshToken', refreshToken, {
      expires: this.expirationDate,
      httpOnly: true,
    });
    res.send({ accessToken });
  }
}
