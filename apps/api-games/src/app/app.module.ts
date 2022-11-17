import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiCoreModule } from '@nest-ms-test/api-core';
import { ApiDatabaseModule } from '@nest-ms-test/api-database';

@Module({
  imports: [ApiCoreModule, ApiDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
