import { UpdateBookDto } from './../dto/updateBookDto';
import { Book } from 'src/infra/entities/book.entity';
import { CreateBookDto } from '../dto/createBook';

export interface IBookService {
  findAll(): Promise<Book[]>;
  findById(id: number): Promise<Book | null>;
  create(book: CreateBookDto): Promise<Book>;
  update(id: number, updatedBook: UpdateBookDto): Promise<Book | null>;
  delete(id: number): Promise<void>;
}
