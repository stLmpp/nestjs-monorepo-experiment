import { config } from 'dotenv';

import { EnvProp } from './env-prop.decorator';
import { environmentMetadata } from './environment.metadata';

import { isNotNil } from '@nest-ms-test/common';

function findEnvVar(names: string[]): string | undefined {
  for (const name of names) {
    if (isNotNil(process.env[name])) {
      return process.env[name];
    }
  }
}

export class Environment {
  private constructor() {
    if (process.env.NODE_ENV !== 'production') {
      config();
    }
    const entries = environmentMetadata.entries();
    const missingVariables: string[] = [];
    for (const [, metadata] of entries) {
      let value = findEnvVar(metadata.names) ?? metadata.defaultValue;
      if (!metadata.required || isNotNil(value)) {
        if (metadata.parser) {
          value = metadata.parser(value);
        }
      } else {
        missingVariables.push(metadata.names.join('/'));
      }
      (this as Record<string, unknown>)[metadata.propertyKey] = value;
    }
    if (missingVariables.length) {
      throw new Error(
        'Missing required environment variables: \n' +
          missingVariables.join('\n')
      );
    }
    this.production = this.nodeEnv === 'production';
  }

  @EnvProp() nodeEnv!: string;
  @EnvProp() dbConnectionString!: string;

  production: boolean;

  static readonly instance = new Environment();
}
