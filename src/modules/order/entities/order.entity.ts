import { BaseEntity } from '@/common/bases/base.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryColumn({ default: String(Date.now()) })
  readonly id: string;

  @Column({ name: 'order_date', default: new Date(), type: 'date' })
  readonly orderDate: Date;

  @Column({
    type: 'decimal',
    default: 0,
    // precision: 10,
    // scale: 2,
    name: 'total_price',
  })
  readonly totalPrice: number;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_details',
    joinColumns: [{ name: 'order_id' }],
    inverseJoinColumns: [{ name: 'product_id' }],
  })
  readonly products: Product[];
}
