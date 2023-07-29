import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book],
  synchronize: process.env.DB_SYNC === 'true',
};
