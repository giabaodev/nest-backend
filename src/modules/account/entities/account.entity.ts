import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  
  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  loginToken: string;
}
