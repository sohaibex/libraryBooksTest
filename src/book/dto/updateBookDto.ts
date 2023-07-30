import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsISBN } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 100)
  author?: string;

  @ApiProperty()
  @IsOptional()
  @IsISBN()
  isbn?: string;
}
