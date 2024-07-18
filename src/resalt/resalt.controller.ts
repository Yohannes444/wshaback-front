import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { ResaltService } from './resalt.service';
import { CreateResaltDto } from './dto/create-resalt.dto';
import { UpdateResaltDto } from './dto/update-resalt.dto';
import { Type } from './entities/type.enum'

@Controller('gameresult')
export class ResaltController {
  constructor(private readonly resaltService: ResaltService) {}

  @Post()
  create(@Body() createResaltDto: CreateResaltDto) {
    return this.resaltService.create(createResaltDto);
  }

 

  @Get()
  findAll() {
    return this.resaltService.findAll();
  }
  @Get('filter')
  async findByCriteria(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('gameId') gameId: string,
    @Query('Type') Type: Type,

  ) {

    return this.resaltService.findByCriteria(Type ,startDate, endDate,gameId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resaltService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResaltDto: UpdateResaltDto) {
    return this.resaltService.update(+id, updateResaltDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resaltService.remove(+id);
  }
}
