import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsString()
  @IsOptional()
  album?: string;

  @IsString()
  @IsOptional()
  spotifyUrl?: string;

  @IsString()
  @IsOptional()
  audioUrl?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsNumber()
  @IsOptional()
  releaseYear?: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
