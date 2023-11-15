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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { multerConfig } from '@src/configs/multer.config';
import { MyRequest } from '@src/types/request.interface';
import { DeleteProjectResponseDto, ProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@ApiTags('Project experience')
@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Create project experience
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: ProjectDto,
  })
  @ApiOkResponse({ type: ProjectDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async createProject(
    @Req() req: MyRequest,
    @Body() body: ProjectDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.projectService.createProject(req.user.id, body, file);
  }

  // Update project experience
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: ProjectDto,
  })
  @ApiOkResponse({ type: ProjectDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProjectDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.projectService.updateProject(id, body, file);
  }

  // Delete project experience
  @ApiOperation({ summary: 'Delete project experience' })
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
  @ApiOkResponse({ type: DeleteProjectResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Delete(':id')
  public async deleteProject(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: MyRequest,
  ) {
    return await this.projectService.deleteProject(req.user.id, id);
  }
}
