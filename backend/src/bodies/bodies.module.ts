import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BodiesService } from './bodies.service';
import { BodiesController } from './bodies.controller';
import { Body, BodySchema } from '../schemas/body.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Body.name, schema: BodySchema }]),
  ],
  controllers: [BodiesController],
  providers: [BodiesService],
})
export class BodiesModule {}
