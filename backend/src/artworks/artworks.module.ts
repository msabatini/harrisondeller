import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtworksService } from './artworks.service';
import { ArtworksController } from './artworks.controller';
import { Artwork, ArtworkSchema } from '../schemas/artwork.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artwork.name, schema: ArtworkSchema }]),
  ],
  controllers: [ArtworksController],
  providers: [ArtworksService],
})
export class ArtworksModule {}
