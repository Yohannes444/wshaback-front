import { PartialType } from '@nestjs/mapped-types';
import { CreateResaltDto } from './create-resalt.dto';

export class UpdateResaltDto extends PartialType(CreateResaltDto) {}
