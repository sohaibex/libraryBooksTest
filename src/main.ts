import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as dotenvConfig } from 'dotenv';
import { HttpExceptionFilter } from './api/errors/http-exception.filter';
import { AppModule } from './app.module';

const envFile = process.env.NODE_ENV === 'prod' ? '.env.production' : '.env';
dotenvConfig({ path: envFile });

console.log(process.env.DB_TYPE);
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_DATABASE);
console.log(process.env.NODE_ENV);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Library Books Api')
    .setDescription('This is a simple webservice for books library')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;
  console.log('port', process.env.PORT);
  await app.listen(port);
}
bootstrap();
