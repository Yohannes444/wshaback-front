import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ Document } from 'mongoose';

import { Type } from './type.enum'
export type DogRaceDocument = Resalt & Document;

class DogRacing {
  @Prop({ type: Number, required: true })
  DogPlaceNum: number;

  @Prop({ type: Number, required: true })
  DogPlaceOdd: number;
}

const DogRacingSchema = SchemaFactory.createForClass(DogRacing);

@Schema({ timestamps: true })
export class Resalt {
  @Prop({ type: Number, required: true })
  gameId: number;

  @Prop({required: true })
  First: DogRacing;

  @Prop({required: true })
  Second: DogRacing;

  @Prop({ enum:Type, required: true })
  type: Type;
  @Prop({ref: 'User',type: mongoose.Schema.Types.ObjectId, required:false})
  tiketerId:mongoose.Schema.Types.ObjectId
}

export const DogRaceSchema = SchemaFactory.createForClass(Resalt);
