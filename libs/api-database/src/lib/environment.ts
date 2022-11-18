import { Injectable } from '@nestjs/common';

import { BaseEnvironment, EnvProp } from '@nest-ms-test/api-core';

@Injectable()
export class Environment extends BaseEnvironment {
  constructor() {
    super();
  }

  @EnvProp() dbConnectionString!: string;
}
