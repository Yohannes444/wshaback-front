import { Module } from '@nestjs/common';
import { GrayhornService } from './grayhorn.service';
import { GrayhornController } from './grayhorn.controller';
import { Grayhorn , GrayhornSchema } from './entities/grayhorn.entity'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grayhorn.name, schema: GrayhornSchema }])
  ],
  controllers: [GrayhornController],
  providers: [GrayhornService],
  exports:[GrayhornService,MongooseModule]
})
export class GrayhornModule {}
