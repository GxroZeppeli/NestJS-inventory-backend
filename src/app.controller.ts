import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPage(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  }
}
