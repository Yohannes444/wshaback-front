import { PartialType } from '@nestjs/mapped-types';
import { CreateGrayhornResulatDto } from './create-grayhorn-resulat.dto';

export class UpdateGrayhornResulatDto extends PartialType(CreateGrayhornResulatDto) {}
