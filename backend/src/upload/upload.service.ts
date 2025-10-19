import { Injectable } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getImageUrl(filename: string): string {
    return `/uploads/images/${filename}`;
  }

  validateImageFile(file: Express.Multer.File): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = extname(file.originalname).toLowerCase();
    return allowedExtensions.includes(ext);
  }
}
