import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../infra/entities/book.entity';
import { BookRepository } from './book.repository';

describe('BookRepository', () => {
  let bookRepository: BookRepository;
  let mockBook: Book;
  let mockBookEntity: Partial<Repository<Book>>;

  beforeEach(async () => {
    mockBook = new Book();
    mockBook.id = 1;
    mockBook.title = 'Test Book';
    mockBook.author = 'Test Author';
    mockBook.isbn = 'Test ISBN';

    mockBookEntity = {
      save: jest.fn().mockResolvedValue(mockBook),
      findOne: jest.fn().mockResolvedValue(mockBook),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookRepository,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookEntity,
        },
      ],
    }).compile();

    bookRepository = module.get<BookRepository>(BookRepository);
  });

  describe('createBook', () => {
    it('should return a book', async () => {
      const result = await bookRepository.createBook(mockBook);
      expect(result).toEqual(mockBook);
      expect(mockBookEntity.save).toHaveBeenCalledWith(mockBook);
    });
  });

  describe('findBookById', () => {
    it('should return the found book', async () => {
      const result = await bookRepository.findBookById(1);
      expect(result).toEqual(mockBook);
      expect(mockBookEntity.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
