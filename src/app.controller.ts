import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/app';
import { APP_CONFIG } from './config/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpServide: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('random')
  async randomData(@Res() res: Response) {
    this.httpServide
      .post(this.configService.get<IAppConfig>(APP_CONFIG).randomNumApi)
      .subscribe(({ data: number }) => {
        res.status(HttpStatus.OK).json({
          value: number,
        });
      });
  }
}
