import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../../modules/category/entities/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 1000 })
  @IsNotEmpty()
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
