import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export const cookieParserSetup = (app: INestApplication) => {
   app.use(cookieParser());
};
