import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export abstract class BaseEntityTimestamp extends BaseEntity {
  @CreateDateColumn({ nullable: true })
  public created_At: Date;
  @UpdateDateColumn({ nullable: true })
  public updated_At: Date;
  @DeleteDateColumn({ nullable: true })
  public deleted_At: Date;
}