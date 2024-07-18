import { Module } from '@nestjs/common';
import { AnimeDogService } from './anime-dog.service';
import { AnimeDogController } from './anime-dog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimeDog, AnimeDogSchema } from './entities/anime-dog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AnimeDog.name, schema: AnimeDogSchema }])
  ],
  controllers: [AnimeDogController],
  providers: [AnimeDogService],
  exports: [AnimeDogService, MongooseModule]

})
export class AnimeDogModule {}
