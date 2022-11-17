import { Injectable } from '@nestjs/common';
import { game } from '@prisma/client';

import { PrismaService } from '@nest-ms-test/api-database';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: number): Promise<game> {
    return this.prismaService.game.findFirstOrThrow({ where: { id } });
  }

  async getAll(): Promise<game[]> {
    return this.prismaService.game.findMany();
  }
}
