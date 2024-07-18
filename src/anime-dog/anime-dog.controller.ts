import { Controller, Get, Post, Body, Patch,Query , Param, Delete } from '@nestjs/common';
import { AnimeDogService } from './anime-dog.service';
import { CreateAnimeDogDto } from './dto/create-anime-dog.dto';
import { UpdateAnimeDogDto } from './dto/update-anime-dog.dto';

@Controller('animeDog')
export class AnimeDogController {
  constructor(private readonly animeDogService: AnimeDogService) {}

  @Post()
  create(@Body() createAnimeDogDto: CreateAnimeDogDto) {
    return this.animeDogService.create(createAnimeDogDto);
  }

  @Get()
  findAll() {
    return this.animeDogService.findAll();
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

    return this.animeDogService.findByCriteria(startDate, endDate, payd, canceled, gameId, minTotalPrize);
  }
  @Get('tiketId/:id')
  findBayTiketId(@Param('id') id: string) {
    return this.animeDogService.findBayTiketId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeDogService.findOne(id);
  }

  @Patch('pay')
  update( @Query() updateAnimeDogDto: UpdateAnimeDogDto) {
    return this.animeDogService.update( updateAnimeDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeDogService.remove(+id);
  }
}
