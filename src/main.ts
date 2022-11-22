import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');
  const options = new DocumentBuilder()
    .setTitle('Muliy REST API')
    .setDescription('API REST para Muliy con MongoDB')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
