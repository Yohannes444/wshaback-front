import { PartialType } from '@nestjs/mapped-types';
import { CreateKenoDto } from './create-keno.dto';

export class UpdateKenoDto extends PartialType(CreateKenoDto) {}
