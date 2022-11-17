import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { game } from '@prisma/client';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll(): Promise<game[]> {
    return this.appService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<game> {
    return this.appService.getById(id);
  }
}
