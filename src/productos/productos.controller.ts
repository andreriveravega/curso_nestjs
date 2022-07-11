import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Put, Query,
	UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
import { ProductoDto } from './dto/producto.dto';
import { ProductoPatchDto } from './dto/producto-patch.dto';
import { ReviewService } from './review/review.service';
import { ReviewDto } from './dto/review.dto';
import { QueryProductosDto } from './dto/query-productos.dto';

@Controller("productos")
export class ProductosController{

	constructor(
		private readonly productosService:ProductosService
	) {}

	@Get()
	getAll(@Query() query:QueryProductosDto){
		//console.log(query)
		const defaultQuery = {
			limit:10,
			order:'nombre',
			query:''
		}
		query={...defaultQuery, ...query}
		return this.productosService.getAll(query)
	}
	@Get(':id')
	async find(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id: number):Promise<Producto>{
		return this.productosService.getId(id)
	}
	@Post()
	//@UsePipes(new ValidationPipe())
	async create(@Body() body:ProductoDto):Promise<Producto>{
		return this.productosService.insert(body);
	}

	@Put(':id')
	async update(@Param('id') id:number, @Body() body:ProductoDto):Promise<Producto>{
		//console.log(body)
		return this.productosService.update(id, body);
	}


	@Patch(':id')
	async patch(
		@Param('id') id:number,
		@Body() body:ProductoPatchDto
	){
		return this.productosService.update(id,body)
	}

	@Delete(':id')
	@HttpCode(204)
	remove(@Param('id') id:number):string{
		this.productosService.delete(id)
		return 'Borrado'
	}



}

