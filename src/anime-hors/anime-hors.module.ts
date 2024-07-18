import { Module } from '@nestjs/common';
import { AnimeHorsService } from './anime-hors.service';
import { AnimeHorsController } from './anime-hors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimeHor , AnimeHorSchema } from './entities/anime-hor.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AnimeHor.name, schema: AnimeHorSchema }])
  ],
  controllers: [AnimeHorsController],
  providers: [AnimeHorsService],
  exports: [AnimeHorsService, MongooseModule]
})
export class AnimeHorsModule {}
