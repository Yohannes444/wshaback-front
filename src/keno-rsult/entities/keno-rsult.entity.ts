// export class KenoRsult {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type KenoRaceDocument = KenoRsult & Document;

class KenoRacing {
  @Prop({ type: Number, required: true })
  KenoPlaceNum: number;

  @Prop({ type: Number, required: true })
  KenoPlaceOdd: number;
}

const KenoRacingSchema = SchemaFactory.createForClass(KenoRacing);

@Schema({ timestamps: true })
export class KenoRsult {
  @Prop({ type: Number, required: true })
  gameId: number;

  @Prop({ type: KenoRacingSchema, required: true })
  First: KenoRacing;

  @Prop({ type: KenoRacingSchema, required: true })
  Second: KenoRacing;


}

export const KenoRaceSchema = SchemaFactory.createForClass(KenoRsult);
