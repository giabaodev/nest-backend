import { BaseEntity } from 'src/common/bases/base.entity';
import { ProductSize } from 'src/common/enums/entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Column({ type: 'enum', enum: ProductSize, default: ProductSize.SM })
  size: ProductSize;

  @Column({ default: true })
  isActive: boolean;
}
