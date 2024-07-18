import { Module } from '@nestjs/common';
import { ResaltService } from './resalt.service';
import { ResaltController } from './resalt.controller';
import { Resalt,DogRaceSchema } from './entities/resalt.entity'
import { MongooseModule } from '@nestjs/mongoose';
import { AnimeDogModule } from 'src/anime-dog/anime-dog.module'
import { AnimeHorsModule } from 'src/anime-hors/anime-hors.module'


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resalt.name, schema: DogRaceSchema }]),
    AnimeDogModule,
    AnimeHorsModule
  ],
  controllers: [ResaltController],
  providers: [ResaltService],
  exports: [ResaltService, MongooseModule]
})
export class ResaltModule {}
