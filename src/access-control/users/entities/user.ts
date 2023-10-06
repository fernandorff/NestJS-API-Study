import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MtmExample } from '../../../domains/mtm-example/entities/mtm-example';
import { OtmExample } from '../../../domains/otm-example/entities/otm-example';

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

  @OneToMany(() => OtmExample, (otmExample) => otmExample.user)
  otmExamples: OtmExample[];

  @ManyToMany(() => MtmExample, (mtmExample) => mtmExample.users)
  @JoinTable({
    name: 'user_mtm_example',
    joinColumn: {
      name: 'mtm_example_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  mtmExamples: MtmExample[];
}
