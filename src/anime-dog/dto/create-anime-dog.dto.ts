import { IsArray, IsPositive, IsNumber, ArrayMinSize, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose,{ Document } from 'mongoose';

class Bet {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  selectedButtons: number[];

  @IsNumber()
  betAmount: number;

}

export class CreateAnimeDogDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Bet)
  @ArrayMinSize(1)
  bets: Bet[];

  @IsNumber()
  @IsPositive()
  gameId: number;

  @IsString()
  tiketId: string;

  @IsString()
  tiketerId:mongoose.Schema.Types.ObjectId
}
