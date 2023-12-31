import { JwtAuthTokenTypeGuard } from '@guards/jwtGuard/jwt-auth-token-type.guard';
import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { multerConfig } from '@src/configs/multer.config';
import { MyRequest } from '@src/types/request.interface';
import {
  ResponseDto,
  UpdateConsentOfUseDto,
  UpdateSampleColorSchemaDto,
  UpdateUserDto,
  UserResponseDto,
} from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Current user
  @ApiOperation({ summary: 'Current user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Get('current')
  public async currentUser(@Req() req: MyRequest) {
    const { user, accessToken, refreshToken } = await this.userService.current(
      req.user.email,
    );
    return {
      refreshToken,
      accessToken,
      user,
    };
  }

  // Update user
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch('update')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async updateUser(
    @Req() req: MyRequest,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { user } = await this.userService.update(req.user.id, body, file);
    return {
      user,
    };
  }

  // Update sample and color schema
  @ApiOperation({ summary: 'Update sample and color schema' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch('update-sample-color')
  public async updateSampleAndColorSchema(
    @Req() req: MyRequest,
    @Body() body: UpdateSampleColorSchemaDto,
  ) {
    const { user } = await this.userService.update(req.user.id, body);
    return {
      user,
    };
  }

  // Update user agreement
  @ApiOperation({ summary: 'Update consent of use' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch('update-consent-use')
  public async updateUserAgreement(
    @Req() req: MyRequest,
    @Body() body: UpdateConsentOfUseDto,
  ) {
    const { user } = await this.userService.update(req.user.id, body);
    return {
      user,
    };
  }
}
