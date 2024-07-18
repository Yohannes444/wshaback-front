import { Module } from '@nestjs/common';
import { KenoRsultService } from './keno-rsult.service';
import { KenoRsultController } from './keno-rsult.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KenoRsult, KenoRaceSchema} from 'src/keno-rsult/entities/keno-rsult.entity'
import { KenoModule } from 'src/keno/keno.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: KenoRsult.name, schema: KenoRaceSchema }]),
    KenoModule
  ],
  controllers: [KenoRsultController],
  providers: [KenoRsultService],
  exports: [KenoRsultService, MongooseModule]

})
export class KenoRsultModule {}
