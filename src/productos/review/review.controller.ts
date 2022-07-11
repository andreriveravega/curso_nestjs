import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReviewDto } from '../dto/review.dto';
import { ReviewService } from './review.service';

@Controller('productos')
export class ReviewController {

  constructor(
    private readonly reviewService:ReviewService
  ) {}

  @Post(':id/review')
  insertReview(
    @Param('id') id:number,
    @Body() body:ReviewDto
  ){
    return this.reviewService.insertReview(id,body)
  }

}
