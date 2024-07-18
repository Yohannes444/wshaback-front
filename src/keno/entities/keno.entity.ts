import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ Document } from 'mongoose';
import { Type } from 'class-transformer';
import { ArrayMinSize } from 'class-validator';
export type KenoDocument = Keno & Document;

@Schema({ _id: false })  // Using _id: false to avoid nested _id for subdocuments
export class Bet {
  @Prop({ type: [Number], required: true })
  @ArrayMinSize(1) 
  selectedButtonsS: number[];

  @Prop({ type: Number, required: true })
  betAmount: number;

  @Prop({ type: Number, required: true })
  odd: number;

  @Prop({ type: Number, required: true })
  possibleWin: number;

  @Prop({ type: Boolean, default: false })
  win: boolean;
  @Prop({ type: Number })
  prize: number;
}

const BetSchema = SchemaFactory.createForClass(Bet);

@Schema({ timestamps: true })
export class Keno {
  @Prop({ type: [BetSchema], required: true })
  @Type(() => Bet)
  @ArrayMinSize(1) 
  bets: Bet[];

  @Prop({ type: Number, required: true })
  gameId: number;

  @Prop({ type: Number, required: true })
  TotalPossibleWin: number; 


  @Prop({ type: Boolean, default: false })
  canceled: boolean;

  @Prop({ type: Boolean, default: false })
  payd: boolean;

  @Prop({ref: 'User',type: mongoose.Schema.Types.ObjectId, required:false})
  tiketerId:mongoose.Schema.Types.ObjectId

  @Prop({type: String, required:true})
  tiketId:String
  
}

export const KenoSchema = SchemaFactory.createForClass(Keno);
