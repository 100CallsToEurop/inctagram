import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerSetup = (app: INestApplication) => {
    const configDoc = new DocumentBuilder()
      .setTitle('Backend for "MERSI"')
      .setDescription('Documentation REST API')
      .setVersion('3.0.0')
      .addTag('MERSI')
      .addBearerAuth({
        type: 'http',
        description: 'Enter JWT Bearer token only',
      })
      .build();

    const document = SwaggerModule.createDocument(app, configDoc);
    SwaggerModule.setup('api/docs', app, document);
}