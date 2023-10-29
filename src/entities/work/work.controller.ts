import { JwtAuthTokenTypeGuard } from '@guards/jwtGuard/jwt-auth-token-type.guard';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { MyRequest } from '@src/types/request.interface';
import { DeleteWorkResponseDto, WorkDto } from './dto/work.dto';
import { WorkService } from './work.service';

@ApiTags('Work experience')
@Controller('api/works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  // Create work experience
  @ApiOperation({ summary: 'Add works experience' })
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
  @ApiOkResponse({ type: WorkDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Post()
  public async createWork(@Req() req: MyRequest, @Body() body: WorkDto) {
    return await this.workService.createWork(req.user.id, body);
  }

  // Update work experience
  @ApiOperation({ summary: 'Update works experience' })
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
  @ApiOkResponse({ type: WorkDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch(':id')
  public async updateWork(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: WorkDto,
  ) {
    return await this.workService.updateWork(id, body);
  }

  // Delete work experience
  @ApiOperation({ summary: 'Delete works experience' })
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
  @ApiOkResponse({ type: DeleteWorkResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Delete(':id')
  public async deleteWork(@Param('id', ParseIntPipe) id: number) {
    return await this.workService.deleteWork(id);
  }
}
