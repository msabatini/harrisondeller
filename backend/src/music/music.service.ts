import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music, MusicDocument } from '../schemas/music.schema';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const music = new this.musicModel(createMusicDto);
    return music.save();
  }

  async findAll(): Promise<Music[]> {
    return this.musicModel.find({ published: true }).sort({ order: 1 }).exec();
  }

  async findAllAdmin(): Promise<Music[]> {
    return this.musicModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Music> {
    const music = await this.musicModel.findById(id).exec();
    if (!music) {
      throw new NotFoundException('Music not found');
    }
    return music;
  }

  async update(id: string, updateMusicDto: UpdateMusicDto): Promise<Music> {
    const music = await this.musicModel
      .findByIdAndUpdate(id, updateMusicDto, { new: true })
      .exec();
    if (!music) {
      throw new NotFoundException('Music not found');
    }
    return music;
  }

  async remove(id: string): Promise<void> {
    const result = await this.musicModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Music not found');
    }
  }
}
