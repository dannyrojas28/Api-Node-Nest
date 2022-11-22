import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  cpu?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  query?: string;
}
