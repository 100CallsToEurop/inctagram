import { INestApplication } from '@nestjs/common';
import { cookieParserSetup, corseSetup, pipesSetup, swaggerSetup } from '.';

export const configApp = (app: INestApplication) => {
  cookieParserSetup(app);
  corseSetup(app);
  pipesSetup(app);
  swaggerSetup(app);
};
