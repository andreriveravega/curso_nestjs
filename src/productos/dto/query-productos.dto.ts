import { IsInt, IsOptional, IsString, Length, Matches, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProductosDto{
  @Length(1,25)
  @IsOptional()
  @IsString()
  query:string


  @Type(()=>Number)
  @Max(100)
  @IsOptional()
  @IsInt()
  limit:number


  @Matches(/^(stock|nombre)$/)
  @IsOptional()
  @IsString()
  order:string
}