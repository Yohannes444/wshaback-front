import { PartialType } from '@nestjs/mapped-types';
import { CreateGrayhornDto } from './create-grayhorn.dto';
import { IsNotEmpty, IsString } from 'class-validator';



export class UpdateGrayhornDto {
  @IsNotEmpty()
  @IsString()
  tiketId: string;

}
