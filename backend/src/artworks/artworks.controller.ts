import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ArtworksService } from './artworks.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('artworks')
export class ArtworksController {
  constructor(private readonly artworksService: ArtworksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArtworkDto: CreateArtworkDto) {
    return this.artworksService.create(createArtworkDto);
  }

  @Get()
  findAll(@Query('bodyId') bodyId?: string) {
    if (bodyId) {
      return this.artworksService.findByBody(bodyId);
    }
    return this.artworksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllAdmin() {
    return this.artworksService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artworksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtworkDto: UpdateArtworkDto) {
    return this.artworksService.update(id, updateArtworkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artworksService.remove(id);
  }
}
