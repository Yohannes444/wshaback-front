
import { IsNotEmpty, IsString } from 'class-validator';



export class UpdateAnimeHorDto {
  @IsNotEmpty()
//   @IsString()
  tiketId: string;

}
