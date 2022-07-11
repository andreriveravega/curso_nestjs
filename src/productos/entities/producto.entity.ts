import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';
import { Size } from './size.entity';
import { JoinTable } from 'typeorm';

@Entity('mis_productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id:number

  @Column('varchar', {length:50})
  nombre:string

  @Column()
  descripcion:string

  @Column('int', {width:5})
  stock:number

  @OneToMany(()=>Review,review=>review.producto)
  reviews:Review[]

  @ManyToMany(()=>Size,size=>size.productos, {cascade:true})
  @JoinTable()
  sizes:Size[]
}
