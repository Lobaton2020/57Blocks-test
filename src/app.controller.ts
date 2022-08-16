import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('random')
  async randomData() {
    return {
      message:
        "This action doesn't work as expecter because the API has an error with cors, but you have the value",
      value: Math.floor(Math.random() * 1000000),
    };
  }
}
