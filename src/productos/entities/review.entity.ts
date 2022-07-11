import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('reviews')
export class Review{

  @PrimaryGeneratedColumn()
  id:number

  @Column('varchar',{length:50})
  userName:string

  @Column('varchar',{length:250})
  review:string

  @Column('int', {width:1})
  valoration:number

  @ManyToOne(()=>Producto, producto=>producto.reviews)
  producto:Producto



}
