import { IBaseRepository } from "@interfaces/interfaces";
import { Repository } from "typeorm";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly baseRepository: Repository<T>) {}

  async save(model: T): Promise<T> {
    return await this.baseRepository.save(model);
  }
  async delete(id: string): Promise<boolean> {
    await this.baseRepository.delete(id);
    return true;
  }
  async softDelete(id: string): Promise<boolean> {
    await this.baseRepository.softDelete(id);
    return true;
  }
}
