import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from '../../book/services/book.service';
import { Book } from '../../infra/entities/book.entity';
import { CreateBookDto } from '../../book/dto/createBook';
import { UpdateBookDto } from '../../book/dto/updateBookDto';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue(new Book()),
            create: jest.fn().mockResolvedValue(new Book()),
            update: jest.fn().mockResolvedValue(new Book()),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await bookController.findAll();
      expect(result).toEqual([]);
      expect(bookService.findAll).toBeCalled();
    });
  });

  describe('findById', () => {
    it('should return a book', async () => {
      const result = await bookController.findById(1);
      expect(result).toBeInstanceOf(Book);
      expect(bookService.findById).toBeCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const bookDto = new CreateBookDto();
      const result = await bookController.create(bookDto);
      expect(result).toBeInstanceOf(Book);
      expect(bookService.create).toBeCalledWith(bookDto);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const bookDto = new UpdateBookDto();
      const result = await bookController.update(1, bookDto);
      expect(result).toBeInstanceOf(Book);
      expect(bookService.update).toBeCalledWith(1, bookDto);
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      await bookController.delete(1);
      expect(bookService.delete).toBeCalledWith(1);
    });
  });
});
