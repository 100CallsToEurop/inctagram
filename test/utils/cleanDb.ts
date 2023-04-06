import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const cleanDb = async (app: INestApplication) => {
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

  return app;
};
