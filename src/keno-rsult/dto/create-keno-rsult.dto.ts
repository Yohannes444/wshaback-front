// export class CreateKenoRsultDto {}
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class kenoPlaceDto {
  @IsNumber()
  DogPlaceNum: number;

  @IsNumber()
  DogPlaceOdd: number;
}

export class CreateKenoRsultDto {
  @IsNumber()
  gameId: number;

  @ValidateNested()
  @Type(() => kenoPlaceDto)
  First: kenoPlaceDto;

  @ValidateNested()
  @Type(() => kenoPlaceDto)
  Second: kenoPlaceDto;
}



