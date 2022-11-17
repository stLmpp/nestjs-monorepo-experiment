import { Module } from '@nestjs/common';

import { Environment } from './environment/environment';

@Module({
  providers: [{ provide: Environment, useFactory: () => Environment.instance }],
  exports: [Environment],
})
export class ApiCoreModule {}
