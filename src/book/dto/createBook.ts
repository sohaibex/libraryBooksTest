import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsISBN } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty()
  @IsString()
  @Length(1, 100)
  author: string;

  @ApiProperty()
  @IsISBN()
  isbn: string;
}
