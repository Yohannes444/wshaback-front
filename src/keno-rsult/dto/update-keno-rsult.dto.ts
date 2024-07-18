import { PartialType } from '@nestjs/mapped-types';
import { CreateKenoRsultDto } from './create-keno-rsult.dto';

export class UpdateKenoRsultDto extends PartialType(CreateKenoRsultDto) {}
