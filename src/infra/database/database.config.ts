import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'booksLibrary',
  entities: [Book],
  synchronize: false,
};
