import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AnimeHorsService } from './anime-hors.service';
import { CreateAnimeHorDto } from './dto/create-anime-hor.dto';
import { UpdateAnimeHorDto } from './dto/update-anime-hor.dto';

@Controller('anime-hors')
export class AnimeHorsController {
  constructor(private readonly animeHorsService: AnimeHorsService) {}

  @Post()
  create(@Body() createAnimeHorDto: CreateAnimeHorDto) {
    return this.animeHorsService.create(createAnimeHorDto);
  }

  @Get()
  findAll() {
    return this.animeHorsService.findAll();
  }
  @Get('filter')
  async findByCriteria(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('payd') payd: string,
    @Query('canceled') canceled: string,
    @Query('gameId') gameId: string,
    @Body('minTotalPrize') minTotalPrize: number,
  ) {
    
    return this.animeHorsService.findByCriteria(startDate, endDate, payd, canceled, gameId, minTotalPrize);
  }

  @Get('tiketId/:id')
  findBayTiketId(@Param('id') id: string) {
    return this.animeHorsService.findBayTiketId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeHorsService.findOne(id);
  }

  @Patch('pay')
  update( @Query() updateAnimeHorDto: UpdateAnimeHorDto) {
    return this.animeHorsService.update(updateAnimeHorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeHorsService.remove(+id);
  }
}
