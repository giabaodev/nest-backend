import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    name: 'full_name',
  })
  fullName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: new Date() })
  birthday: Date;

  @Column({ nullable: true, name: 'login_token' })
  loginToken: string;

  @Column({ nullable: true, name: 'last_login' })
  lastLogin: Date;

  @Column({ default: false, name: 'is_active' })
  isActive: boolean;
}
