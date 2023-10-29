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
import { DeleteEducationResponseDto, EducationDto } from './dto/education.dto';
import { EducationService } from './education.service';

@ApiTags('Education experience')
@Controller('api/educations')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  // Create education experience
  @ApiOperation({ summary: 'Add education experience' })
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
  @ApiOkResponse({ type: EducationDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Post()
  public async createEducation(
    @Req() req: MyRequest,
    @Body() body: EducationDto,
  ) {
    return await this.educationService.createEducation(req.user.id, body);
  }

  // Update education experience
  @ApiOperation({ summary: 'Update education experience' })
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
  @ApiOkResponse({ type: EducationDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch(':id')
  public async updateEducation(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EducationDto,
  ) {
    return await this.educationService.updateEducation(id, body);
  }

  // Delete education experience
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
  @ApiOkResponse({ type: DeleteEducationResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Delete(':id')
  public async deleteEducation(@Param('id', ParseIntPipe) id: number) {
    return await this.educationService.deleteEducation(id);
  }
}
