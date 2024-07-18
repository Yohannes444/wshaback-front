import { IsArray, IsBoolean, IsNumber, ArrayMinSize,IsString } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose,{ Document } from 'mongoose';
export class CreateGrayhornDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  selectedButtons: number[][];

  @IsNumber()
  betAmount: number;

  @IsBoolean()
  isExactaActive: boolean;

  @IsBoolean()
  isQuinellaActive: boolean;
  
  @IsString()
  tiketId: string;

  @IsString()
  tiketerId:mongoose.Schema.Types.ObjectId
  

}