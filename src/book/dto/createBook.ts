import { IsString, Length, IsISBN } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 100)
  author: string;

  @IsISBN()
  isbn: string;
}
