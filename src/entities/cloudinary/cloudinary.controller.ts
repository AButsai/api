import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
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
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { multerConfig } from '@src/configs/multer.config';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryDto, CloudinaryResponseDto } from './dto/cloudinary.dto';
import { EUploadPath } from './enums/upload.enum';

@ApiTags('Upload file')
@Controller('api/uploads')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  // Upload file
  @ApiOperation({ summary: 'Upload images' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_ACCESS_TOKEN_HERE',
    },
  })
  @ApiParam({
    name: 'folder',
    enum: EUploadPath,
    description:
      'Path parameter (can be "educations" or "avatars" or "projects")',
  })
  @ApiResponse({ status: 200, type: CloudinaryResponseDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: CloudinaryDto,
  })
  @ApiUnauthorizedResponse({ description: 'Not authorization jwt expired' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Post(':id/:folder')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.cloudinaryService.uploadImage(id, file, folder);
  }
}
