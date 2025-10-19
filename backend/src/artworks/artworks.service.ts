import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artwork, ArtworkDocument } from '../schemas/artwork.schema';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

@Injectable()
export class ArtworksService {
  constructor(
    @InjectModel(Artwork.name) private artworkModel: Model<ArtworkDocument>,
  ) {}

  async create(createArtworkDto: CreateArtworkDto): Promise<Artwork> {
    const artwork = new this.artworkModel(createArtworkDto);
    return artwork.save();
  }

  async findAll(): Promise<Artwork[]> {
    return this.artworkModel
      .find({ published: true })
      .populate('bodyId')
      .sort({ order: 1 })
      .exec();
  }

  async findAllAdmin(): Promise<Artwork[]> {
    return this.artworkModel
      .find()
      .populate('bodyId')
      .sort({ order: 1 })
      .exec();
  }

  async findByBody(bodyId: string): Promise<Artwork[]> {
    return this.artworkModel
      .find({ bodyId, published: true })
      .sort({ order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Artwork> {
    const artwork = await this.artworkModel.findById(id).populate('bodyId').exec();
    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }
    return artwork;
  }

  async update(id: string, updateArtworkDto: UpdateArtworkDto): Promise<Artwork> {
    const artwork = await this.artworkModel
      .findByIdAndUpdate(id, updateArtworkDto, { new: true })
      .populate('bodyId')
      .exec();
    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }
    return artwork;
  }

  async remove(id: string): Promise<void> {
    const result = await this.artworkModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Artwork not found');
    }
  }
}
