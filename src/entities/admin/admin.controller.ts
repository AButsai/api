import { EColorSchema, ESample } from '@entities/icons-svg/enums/icon-svg.enum';
import { JwtAuthTokenTypeGuard } from '@guards/jwtGuard/jwt-auth-token-type.guard';
import { Roles } from '@guards/roleGuard/decorators/role.decorator';
import { RoleGuard } from '@guards/roleGuard/role.guard';
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
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
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ERole } from '@src/enums/role.enum';
import { MyRequest } from '@src/types/request.interface';
import { AdminService } from './admin.service';
import { AdminResponseDto } from './dto/admin.dto';

@ApiTags('Admin')
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get all users
  @ApiOperation({ summary: 'Add icons experience' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Items per page',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'color',
    description: 'Color schema order',
    required: false,
    enum: EColorSchema,
    enumName: 'EColorSchema',
    type: String,
    example: 'default',
  })
  @ApiQuery({
    name: 'sample',
    description: 'Sample order',
    required: false,
    enum: ESample,
    enumName: 'ESample',
    type: String,
    example: 'default',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ type: [AdminResponseDto] })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  @Get('users')
  public async getAllUsers(
    @Req() req: MyRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('color') color: EColorSchema,
    @Query('sample') sample: ESample,
  ) {
    return await this.adminService.getAllUsers(
      req.user.id,
      page,
      limit,
      color,
      sample,
    );
  }
}
