import { Book } from 'src/infra/entities/book.entity';
import { CreateBookDto } from '../dto/createBook';

export interface IBookService {
  findAll(): Promise<Book[]>;
  findById(id: number): Promise<Book | null>;
  create(book: CreateBookDto): Promise<Book>;
  update(id: number, updatedBook: CreateBookDto): Promise<Book | null>;
  delete(id: number): Promise<void>;
}
