import { TestingModule, Test } from '@nestjs/testing';
import { BookNotFoundException } from '../../core/errors/BookNotFoundException';
import { Book } from '../../infra/entities/book.entity';
import { CreateBookDto } from '../dto/createBook';
import { UpdateBookDto } from '../dto/updateBookDto';
import { BookRepository } from '../repository/book.repository';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let repo: BookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useValue: {
            findAllBooks: jest.fn(),
            findBookById: jest.fn(),
            createBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repo = module.get<BookRepository>(BookRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const testBook = new Book();
      jest.spyOn(repo, 'findAllBooks').mockResolvedValue([testBook]);

      expect(await service.findAll()).toEqual([testBook]);
    });
  });

  describe('findById', () => {
    it('should return a single book', async () => {
      const testBook = new Book();
      jest.spyOn(repo, 'findBookById').mockResolvedValue(testBook);

      expect(await service.findById(1)).toEqual(testBook);
    });

    it('should throw a BookNotFoundException if the book is not found', async () => {
      jest.spyOn(repo, 'findBookById').mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(BookNotFoundException);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const testBook = new Book();
      const createBookDto = new CreateBookDto();

      jest.spyOn(repo, 'createBook').mockResolvedValue(testBook);

      expect(await service.create(createBookDto)).toEqual(testBook);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const testBook = new Book();
      const updateBookDto = new UpdateBookDto();

      jest.spyOn(repo, 'findBookById').mockResolvedValue(testBook);
      jest.spyOn(repo, 'updateBook').mockResolvedValue(testBook);

      expect(await service.update(1, updateBookDto)).toEqual(testBook);
    });

    it('should throw a BookNotFoundException if the book is not found', async () => {
      const updateBookDto = new UpdateBookDto();

      jest.spyOn(repo, 'findBookById').mockResolvedValue(null);

      await expect(service.update(1, updateBookDto)).rejects.toThrow(
        BookNotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      jest
        .spyOn(repo, 'deleteBook')
        .mockResolvedValue({ affected: 1, raw: [] });

      await service.delete(1);
      expect(repo.deleteBook).toHaveBeenCalledWith(1);
    });

    it('should throw a BookNotFoundException if the book is not found', async () => {
      jest
        .spyOn(repo, 'deleteBook')
        .mockResolvedValue({ affected: 0, raw: [] });

      await expect(service.delete(1)).rejects.toThrow(BookNotFoundException);
    });
  });
});
