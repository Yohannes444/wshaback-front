import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DogPlaceDto {
  @IsNumber()
  DogPlaceNum: number;

  @IsNumber()
  DogPlaceOdd: number;
}

export class CreateResaltDto {
  @IsNumber()
  gameId: number;

  @IsString()
  type:string

  @ValidateNested()
  @Type(() => DogPlaceDto)
  First: DogPlaceDto;

  @ValidateNested()
  @Type(() => DogPlaceDto)
  Second: DogPlaceDto;
}



