import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MusicDocument = Music & Document;

@Schema({ timestamps: true })
export class Music {
  @Prop({ required: true })
  title: string;

  @Prop()
  artist: string;

  @Prop()
  album: string;

  @Prop()
  spotifyUrl: string;

  @Prop()
  audioUrl: string;

  @Prop()
  coverImage: string;

  @Prop()
  releaseYear: number;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
