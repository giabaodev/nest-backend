import { BaseEntity } from '@/common/bases/base.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_name' })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
