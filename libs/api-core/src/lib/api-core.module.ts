import { DynamicModule, Module, Type } from '@nestjs/common';

import { BaseEnvironment } from './environment/base-environment';

export interface ApiCoreForRootOptions {
  environment: Type<BaseEnvironment>;
}

@Module({})
export class ApiCoreModule {
  static forRoot(options: ApiCoreForRootOptions): DynamicModule {
    return {
      module: ApiCoreModule,
      exports: [options.environment],
      providers: [
        { provide: options.environment, useClass: options.environment },
      ],
    };
  }
}
