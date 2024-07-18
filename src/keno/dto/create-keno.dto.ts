import { IsArray, IsNumber, ArrayMinSize, IsPositive, IsString,ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose,{ Document } from 'mongoose';

class Bet {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  selectedButtonsS: number[];

  @IsNumber()
  betAmount: number;

  @IsNumber()
  @IsPositive()
  odd: number;
  
  @IsNumber()
  @IsPositive()
  possibleWin: number;
}
export class CreateKenoDto {
 
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Bet)
  @ArrayMinSize(1)
  bets: Bet[];

  @IsString()
  @IsPositive()
  gameId: string;

  @IsString()
  @IsPositive()
  tiketId: string;

  @IsString()
  tiketerId:mongoose.Schema.Types.ObjectId
  
}
