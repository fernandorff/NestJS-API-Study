import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseCrudService<T, ParentType = any> {
  constructor(protected readonly repository: Repository<T>) {}

  abstract getRelations(): string[];

  async create(entityData: DeepPartial<T>, parent?: ParentType): Promise<T> {
    console.log(parent);
    const entity = this.repository.create(entityData);
    if (parent) {
      const parentClassName = parent.constructor.name;
      (entity as any)[parentClassName.toLowerCase()] = parent;
    }
    return this.repository.save(entity);
  }

  async findById(id: number): Promise<T | null> {
    if (!id) {
      return null;
    }
    return this.repository.findOne({
      where: {
        // @ts-ignore
        id: id,
      },
      relations: this.getRelations(),
    });
  }

  async findAll(): Promise<T[]> {
    return this.repository.find({ relations: this.getRelations() });
  }

  async update(id: number, entityData: DeepPartial<T>): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) {
      return null;
    }
    Object.assign(entity, entityData);
    return this.repository.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.findById(id);
    if (!entity) {
      return false;
    }
    await this.repository.remove(entity);
    return true;
  }

  async customFindAll(queryBuilder: SelectQueryBuilder<T>): Promise<T[]> {
    return queryBuilder.getMany();
  }
}
