import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsISBN } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty({ description: 'Author of the book' })
  @IsString()
  @Length(1, 100)
  author: string;

  @ApiProperty({ description: 'ISBN of the book' })
  @IsISBN()
  isbn: string;
}
