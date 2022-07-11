import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewDto } from '../dto/review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository:Repository<Producto>,
    @InjectRepository(Review)
    private readonly reviewRepository:Repository<Review>,
  ){}

  async insertReview(id:number, body:ReviewDto){
    const producto=await this.productoRepository.findOne(id)
    if(producto){
      const review = this.reviewRepository.create(body)
      review.producto=producto
      return await this.reviewRepository.save(review)
    }
    throw new NotFoundException(`El producto ${id} no existe`)
  }


}
