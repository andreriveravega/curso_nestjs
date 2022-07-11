import { IsArray, IsInt, IsString, Length, Min } from 'class-validator';

export class ProductoDto {
  @IsString({message:'Debe indicarnos el nombre'})
  nombre:string

  @IsString()
  @Length(10,50)
  descripcion:string

  @IsInt()
  @Min(0,{message:'El stock puede ser cero o superior'})
  stock:number

  @IsString({each:true})
  @IsArray()
  sizes:string[]
}
