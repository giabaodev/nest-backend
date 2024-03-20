import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: new Date() })
  birthday: Date;

  @Column({ nullable: true })
  loginToken: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ default: false })
  isActive: boolean;
}
