import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Review } from './entities/review.entity';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { Size } from './entities/size.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Producto, Review, Size])],
  controllers:[ProductosController, ReviewController],
  providers:[ProductosService, ReviewService]
})
export class ProductosModule {}
