import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BodyDocument = Body & Document;

@Schema({ timestamps: true })
export class Body {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  year: number;

  @Prop()
  coverImage: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const BodySchema = SchemaFactory.createForClass(Body);
