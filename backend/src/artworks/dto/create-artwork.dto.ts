import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsMongoId } from 'class-validator';

export class CreateArtworkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  medium?: string;

  @IsString()
  @IsOptional()
  dimensions?: string;

  @IsMongoId()
  @IsNotEmpty()
  bodyId: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
