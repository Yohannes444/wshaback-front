import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimeDogDto } from './create-anime-dog.dto';
import { IsNotEmpty, IsString } from 'class-validator';



export class UpdateAnimeDogDto {
  @IsNotEmpty()
  @IsString()
  tiketId: string;

}
