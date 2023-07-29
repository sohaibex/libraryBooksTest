import { BookService } from './book/services/book.service';
import { Module } from '@nestjs/common';
import { BookController } from './api/controllers/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book/repository/book.repository';
import { dataBaseConfig } from './infra/database/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    TypeOrmModule.forFeature([BookRepository]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
