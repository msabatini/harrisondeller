import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArtworkDocument = Artwork & Document;

@Schema({ timestamps: true })
export class Artwork {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  year: number;

  @Prop()
  medium: string;

  @Prop()
  dimensions: string;

  @Prop({ type: Types.ObjectId, ref: 'Body', required: true })
  bodyId: Types.ObjectId;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);
