import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OtmExample } from '../../../domains/otm-example/entities/otm.example';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ nullable: true })
  firstName: string | null;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  cpf: string | null;

  @Column({ type: 'date', nullable: true })
  birth: Date | null;

  @OneToMany((type) => OtmExample, (otmExample) => otmExample.user)
  otmExample: OtmExample[];
}
