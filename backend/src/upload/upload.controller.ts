import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  private readonly logger = new Logger('UploadController');

  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(`Upload attempt: ${JSON.stringify({ filename: file?.originalname, mimetype: file?.mimetype })}`);
    
    if (!file) {
      this.logger.error('No file provided');
      throw new BadRequestException('No file uploaded');
    }

    if (!this.uploadService.validateImageFile(file)) {
      this.logger.error(`Invalid file type: ${file.originalname}, mimetype: ${file.mimetype}`);
      throw new BadRequestException('Invalid file type. Only images are allowed.');
    }

    const imageUrl = this.uploadService.getImageUrl(file.filename);
    this.logger.log(`File uploaded successfully: ${file.filename}`);
    
    return {
      filename: file.filename,
      url: imageUrl,
    };
  }
}
