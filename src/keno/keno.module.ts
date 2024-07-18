import { Module } from '@nestjs/common';
import { KenoService } from './keno.service';
import { KenoController } from './keno.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Keno, KenoSchema } from './entities/keno.entity'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Keno.name, schema: KenoSchema }])
  ],
  controllers: [KenoController],
  providers: [KenoService],
  exports: [KenoService, MongooseModule]

})
export class KenoModule {}

