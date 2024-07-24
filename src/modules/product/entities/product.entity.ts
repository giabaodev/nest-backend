import { Category } from '@/modules/category/entities/category.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { ProductSize } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_name' })
  name: string;

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Column({ type: 'enum', enum: ProductSize, default: ProductSize.SM })
  size: ProductSize;

  @Column({ name: 'is_activate', default: true })
  isActivate: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
