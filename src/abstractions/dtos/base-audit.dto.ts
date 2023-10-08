import { Expose } from 'class-transformer';

export class BaseAuditDto {
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date | null;
}
