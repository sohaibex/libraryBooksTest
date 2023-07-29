import { IsOptional, IsString, Length, IsISBN } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  author?: string;

  @IsOptional()
  @IsISBN()
  isbn?: string;
}
