import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KenoRsultService } from './keno-rsult.service';
import { CreateKenoRsultDto } from './dto/create-keno-rsult.dto';
import { UpdateKenoRsultDto } from './dto/update-keno-rsult.dto';


@Controller('keno-rsult')
export class KenoRsultController {
  constructor(private readonly kenoRsultService: KenoRsultService) {}

  @Post()
  create(@Body() createKenoRsultDto: CreateKenoRsultDto) {
    return this.kenoRsultService.create(createKenoRsultDto);
  }

  @Get()
  findAll() {
    return this.kenoRsultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kenoRsultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKenoRsultDto: UpdateKenoRsultDto) {
    return this.kenoRsultService.update(+id, updateKenoRsultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kenoRsultService.remove(+id);
  }
}
