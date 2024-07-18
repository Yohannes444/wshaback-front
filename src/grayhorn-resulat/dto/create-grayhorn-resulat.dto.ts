import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ResaltDto {
  @IsNumber()
  @IsNotEmpty()
  first: number;

  @IsNumber()
  @IsNotEmpty()
  second: number;

  @IsNumber()
  @IsNotEmpty()
  third: number;
}

export class CreateGrayhornResulatDto {
  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @IsString()
  @IsNotEmpty()
  tiketerId: string;

  @ValidateNested()
  @Type(() => ResaltDto)
  @IsNotEmpty()
  resalt: ResaltDto;

  @IsNumber()
  @IsNotEmpty()
  windOdd: number;

  @IsNumber()
  @IsNotEmpty()
  qunelaOdd: number;

  @IsNumber()
  @IsNotEmpty()
  exactOdd: number;

  @IsNumber()
  @IsNotEmpty()
  tryfectaOdd: number;
}
