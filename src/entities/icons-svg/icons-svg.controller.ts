import { JwtAuthTokenTypeGuard } from '@guards/jwtGuard/jwt-auth-token-type.guard';
import { Roles } from '@guards/roleGuard/decorators/role.decorator';
import { RoleGuard } from '@guards/roleGuard/role.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ERole } from '@src/enums/role.enum';
import { MyRequest } from '@src/types/request.interface';
import { IconsSvgDto, IconsSvgResponseDto } from './dto/icons-svg.dto';
import { EColorSchema, ENameContacts } from './enums/icon-svg.enum';
import { IconsSvgService } from './icons-svg.service';

@ApiTags('Icons svg')
@Controller('api/icons-svg')
export class IconsSvgController {
  constructor(private readonly iconSvgService: IconsSvgService) {}

  // Add icon
  @ApiOperation({ summary: 'Add icons experience' })
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
  @ApiOkResponse({ type: IconsSvgDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  @Post()
  public async addIcon(@Req() req: MyRequest, @Body() body: IconsSvgDto) {
    return await this.iconSvgService.addIcon(req.user.id, body);
  }

  // Update icon
  @ApiOperation({ summary: 'Add icons experience' })
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
  @ApiOkResponse({ type: IconsSvgDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  @Patch(':id')
  public async updateIcon(@Param('id') id: string, @Body() body: IconsSvgDto) {
    return await this.iconSvgService.updateIcon(id, body);
  }

  // Get icon by sort name or colorSchema
  @ApiOperation({ summary: 'Add icons experience' })
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
  @ApiOkResponse({ type: IconsSvgDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get()
  public async getAllIcons(
    @Query('name') name: ENameContacts,
    @Query('color') color: EColorSchema,
    @Req() req: MyRequest,
  ) {
    return await this.iconSvgService.getAllIcons(req.user.id, name, color);
  }

  // Delete icon
  @ApiOperation({ summary: 'Add icons experience' })
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
  @ApiOkResponse({ type: IconsSvgResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  @Delete('id')
  public async deleteIcon(@Param('id') id: string) {
    return await this.iconSvgService.deleteIcon(id);
  }
}
