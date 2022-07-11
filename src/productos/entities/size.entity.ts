import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('sizes')
export class Size{
 @PrimaryGeneratedColumn()
 id:number

 @Column('varchar', {length:5})
 size:string

 @ManyToMany(()=>Producto,producto=>producto.sizes)
 productos:Producto[]
}