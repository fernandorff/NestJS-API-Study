import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OtmExampleEntity } from '../../../domains/otm-example/entities/otm-example.entity';

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

  @OneToMany(() => OtmExampleEntity, (otmExample) => otmExample.user)
  otmExample: OtmExampleEntity[];
}
