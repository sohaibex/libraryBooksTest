// src/app/book/repository/book.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/infra/entities/book.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private bookEntity: Repository<Book>,
  ) {}

  async createBook(book: Book): Promise<Book> {
    return this.bookEntity.save(book);
  }

  async findBookById(id: number): Promise<Book> {
    const book = await this.bookEntity.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return book;
  }

  async findAllBooks(): Promise<Book[]> {
    return this.bookEntity.find();
  }

  async updateBook(book: Book): Promise<Book> {
    return this.bookEntity.save(book);
  }

  async deleteBook(id: number): Promise<DeleteResult> {
    return this.bookEntity.delete(id);
  }
}
