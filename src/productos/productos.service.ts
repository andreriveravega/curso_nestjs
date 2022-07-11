import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './entities/producto.entity';
import { ProductoDto } from './dto/producto.dto';
import { ProductoPatchDto } from './dto/producto-patch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ReviewDto } from './dto/review.dto';
import { Size } from './entities/size.entity';
import { QueryProductosDto } from './dto/query-productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>
  ) { }

  getAll(query:QueryProductosDto):Promise<Producto[]>{
    return this.productoRepository.find({
      take:query.limit,
      relations:['sizes','reviews'],
      where:[
        {nombre: Like(`%${query.query}%`)},
        {descripcion: Like(`%${query.query}%`)}
      ],
      order:{
        [query.order]:'ASC'
      }
    })
  }

  async getId(id:number):Promise<Producto>{
    let producto = await this.productoRepository.findOne(id)
    if(producto){
      return producto
    }
    throw new NotFoundException('No puedo encontrar el producto')
  }

  async insert(body:ProductoDto):Promise<Producto>{
    const sizes = await Promise.all(body.sizes.map(size=>this.selectOrCreateSize(size)))
    const producto = this.productoRepository.create({
      ...body,
      sizes
    })
    await this.productoRepository.save(producto)
    return producto
  }

  async update(id:number, body: ProductoDto|ProductoPatchDto) :Promise<Producto>{
    const sizes = body.sizes && await Promise.all(body.sizes.map(size=>this.selectOrCreateSize(size)))
    let entradaProducto = {
      id,
      ...body,
      sizes
    }
    const producto = await this.productoRepository.preload(entradaProducto)
    if(producto){
      return this.productoRepository.save(producto)
    }
    throw new NotFoundException(`No he encontrado el producto con id ${id}`);

  }

  async delete(id: number) {
    const producto = await this.productoRepository.findOne(id);
    if(producto) {
      return this.productoRepository.remove(producto);
    }
    throw new NotFoundException(`No he encontrado el producto con id ${id}`);
  }

  private async selectOrCreateSize(size: string): Promise<Size>{
    let siseEntity= await this.sizeRepository.findOne({size})
    if(siseEntity){
      return siseEntity
    }
    return this.sizeRepository.create({size})
    //return this.sizeRepository.save(siseEntity)
  }








}
