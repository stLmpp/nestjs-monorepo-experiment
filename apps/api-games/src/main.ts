import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { Environment } from './app/environment';

import { createApi } from '@nest-ms-test/api-core';

const { api, init } = createApi({
  module: AppModule,
});

init()
  .then((app) => {
    const environment = app.get(Environment);
    if (!environment.production) {
      app.listen(3333);
    }
    Logger.log('Server running');
  })
  .catch((error) => {
    Logger.error(error);
  });

export { api as games };
