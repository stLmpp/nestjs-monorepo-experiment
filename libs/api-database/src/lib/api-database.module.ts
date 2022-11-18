import { Logger, Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      useFactory: () => ({
        prismaOptions: {
          log: [{ emit: 'event', level: 'query' }],
        },
      }),
    }),
  ],
  exports: [PrismaModule],
})
export class ApiDatabaseModule {
  constructor(private readonly prismaService: PrismaService) {
    const logger = new Logger('Database');

    this.prismaService.$on('query', (event) => {
      logger.log(`${event.query}\n${event.params}`);
    });
  }
}
