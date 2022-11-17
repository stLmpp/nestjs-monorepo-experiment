import { INestApplication, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { https, HttpsFunction } from 'firebase-functions';

export interface CreateServerOptions {
  prefix?: string;
  module: Type;
}

export interface CreateServerReturn {
  api: HttpsFunction;
  init(): Promise<INestApplication>;
}

export function createApi(options: CreateServerOptions): CreateServerReturn {
  const server = express();
  return {
    api: https.onRequest(server),
    init: async () => {
      const app = await NestFactory.create(
        options.module,
        new ExpressAdapter(server)
      );
      if (process.env.NODE_ENV === 'development') {
        app.enableCors();
      }
      if (options.prefix) {
        app.setGlobalPrefix(options.prefix);
      }
      return app.init();
    },
  };
}
