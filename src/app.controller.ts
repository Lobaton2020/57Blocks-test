import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpServide: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('random')
  async randonData(@Res() res: Response) {
    this.httpServide
      .post(
        'https://randommer.io/Number?range=range&LowerRange=1&HigherRange=1000000&X-Requested-With=XMLHttpRequest',
      )
      .subscribe(({ data: number }) => {
        res.status(HttpStatus.OK).json({
          value: number,
        });
      });
  }
}
