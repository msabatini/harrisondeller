import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Body, BodyDocument } from '../schemas/body.schema';
import { CreateBodyDto } from './dto/create-body.dto';
import { UpdateBodyDto } from './dto/update-body.dto';

@Injectable()
export class BodiesService {
  constructor(
    @InjectModel(Body.name) private bodyModel: Model<BodyDocument>,
  ) {}

  async create(createBodyDto: CreateBodyDto): Promise<Body> {
    const body = new this.bodyModel(createBodyDto);
    return body.save();
  }

  async findAll(): Promise<Body[]> {
    return this.bodyModel.find({ published: true }).sort({ order: 1 }).exec();
  }

  async findAllAdmin(): Promise<Body[]> {
    return this.bodyModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Body> {
    const body = await this.bodyModel.findById(id).exec();
    if (!body) {
      throw new NotFoundException('Body of work not found');
    }
    return body;
  }

  async update(id: string, updateBodyDto: UpdateBodyDto): Promise<Body> {
    const body = await this.bodyModel
      .findByIdAndUpdate(id, updateBodyDto, { new: true })
      .exec();
    if (!body) {
      throw new NotFoundException('Body of work not found');
    }
    return body;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bodyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Body of work not found');
    }
  }
}
