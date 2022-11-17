export class EnvPropertyMetadata {
  constructor(
    public readonly propertyKey: string,
    public readonly names: string[],
    public readonly required: boolean,
    public readonly defaultValue: unknown,
    public readonly parser?: (value: unknown) => unknown
  ) {}
}

export class EnvironmentMetadata {
  private readonly _store = new Map<string, EnvPropertyMetadata>();

  add(key: string, value: EnvPropertyMetadata): this {
    this._store.set(key, value);
    return this;
  }

  entries(): Array<[string, EnvPropertyMetadata]> {
    return [...this._store.entries()];
  }
}

export const environmentMetadata = new EnvironmentMetadata();
