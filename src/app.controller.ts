import { Controller, Get, Post, Body, Patch,Query , Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { IpService } from './ip.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ipService: IpService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('stat')
  async getStat(
    @Query('tiketerId') tiketerId: string,
  ) {

    return this.appService.getStat( tiketerId);
  }

  @Get('api/getLocalIP')
  getLocalIP() {
    return { localIP: this.ipService.getLocalIP() };
  }
}
