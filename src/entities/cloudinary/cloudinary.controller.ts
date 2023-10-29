import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryDto, CloudinaryResponseDto } from './dto/cloudinary.dto';
import { multerConfig } from '@src/configs/multer.config';

@ApiTags('Upload files')
@Controller('api/uploads')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  // Upload images
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
  @Post()
  @UseInterceptors(FilesInterceptor('files', 15, multerConfig))
  public async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.cloudinaryService.uploadImage(files);
  }
}
