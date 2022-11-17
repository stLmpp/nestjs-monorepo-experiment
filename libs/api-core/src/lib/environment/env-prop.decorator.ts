import { snakeCase } from 'snake-case';

import {
  environmentMetadata,
  EnvPropertyMetadata,
} from './environment.metadata';

import { coerceArray, isString } from '@nest-ms-test/common';

export interface EnvPropertyOptions {
  required?: boolean;
  name?: string | string[];
  parser?: (value: unknown) => unknown;
  defaultValue?: unknown;
}

const defaultParserMap = new Map<unknown, (value: unknown) => unknown>([
  [Number, (value) => Number(value)],
  [Boolean, (value) => (isString(value) ? value === 'true' : !!value)],
]);

export function EnvProp(options?: EnvPropertyOptions): PropertyDecorator {
  return (target, _propertyKey) => {
    const propertyKey = _propertyKey.toString();
    const name = coerceArray(
      options?.name ?? snakeCase(propertyKey).toUpperCase()
    );
    const parser =
      options?.parser ??
      defaultParserMap.get(
        Reflect.getMetadata('design:type', target, _propertyKey)
      );
    environmentMetadata.add(
      propertyKey,
      new EnvPropertyMetadata(
        propertyKey,
        name,
        options?.required ?? true,
        options?.defaultValue,
        parser
      )
    );
  };
}
