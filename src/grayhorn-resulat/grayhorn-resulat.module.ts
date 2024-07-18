import { Module } from '@nestjs/common';
import { GrayhornResulatService } from './grayhorn-resulat.service';
import { GrayhornResulatController } from './grayhorn-resulat.controller';
import { GrayhornResulat, GrayhornResulatSchema } from './entities/grayhorn-resulat.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { GrayhornModule } from 'src/grayhorn/grayhorn.module'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: GrayhornResulat.name, schema: GrayhornResulatSchema }]),
    GrayhornModule
  ],
  controllers: [GrayhornResulatController],
  providers: [GrayhornResulatService],
})
export class GrayhornResulatModule {}
