import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MtmExample } from '../../../domains/mtm-example/entities/mtm-example';
import { OtmExample } from '../../../domains/otm-example/entities/otm-example';
import { Employee } from '../../../domains/employee/entities/employee';
import { BaseAuditEntity } from '../../../abstractions/entities/base-audit.entity';

@Entity()
export class User extends BaseAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

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
