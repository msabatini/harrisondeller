import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

@Injectable()
export class UploadService {
  private apiUrl: string;

  constructor(private configService: ConfigService) {
    // Get API URL from environment or use default
    this.apiUrl = process.env.API_URL || 'http://localhost:3001';
  }

  getImageUrl(filename: string): string {
    return `${this.apiUrl}/uploads/images/${filename}`;
  }

  validateImageFile(file: Express.Multer.File): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = extname(file.originalname).toLowerCase();
    return allowedExtensions.includes(ext);
  }
}
