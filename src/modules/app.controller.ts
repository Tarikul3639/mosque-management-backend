import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import type { Response } from 'express';

@Controller()
export class AppController {
  
  @Get('favicon.ico')
  @ApiExcludeEndpoint()
  getFaviconIco(@Res() res: Response) {
    res.status(204).send();
  }

  @Get('favicon.png')
  @ApiExcludeEndpoint()
  getFaviconPng(@Res() res: Response) {
    res.status(204).send();
  }

  @Get()
  getHello() {
    return { message: 'Mosque Management Backend is running successfully!' };
  }
}