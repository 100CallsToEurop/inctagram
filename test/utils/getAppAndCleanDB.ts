import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getAppAndCleanDB = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        // useFactory: //getTypeOrmConfig //todo get typeorm config
      }),
      // AppModule,//todo AppModule
    ],
  }).compile();
  const app: INestApplication = moduleFixture.createNestApplication();

  // useContainer(app.select(AppModule), { fallbackOnErrors: true }); //todo AppModule
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.use(cookieParser());

  await app.init();
  //clean db
  const dataSource = await app.resolve(DataSource);
  await dataSource.query(`
        CREATE OR REPLACE FUNCTION truncate_tables(username IN VARCHAR) RETURNS void AS $$
DECLARE
    statements CURSOR FOR
        SELECT tablename FROM pg_tables
        WHERE tableowner = username AND schemaname = 'public';
BEGIN
    FOR stmt IN statements LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' CASCADE;';
    END LOOP;
END;
$$ LANGUAGE plpgsql;
SELECT truncate_tables('postgres');
SELECT truncate_tables('fqidihfj');
SELECT truncate_tables('qTheSky'); 
SELECT truncate_tables('neondb'); 
        `);
  //clean db

  return app;
};
