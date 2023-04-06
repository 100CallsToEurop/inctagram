import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from "typeorm";
import { BaseEntityAgregate } from "./base.entity.agregate";

@Entity()
export abstract class BaseEntityTimestampAgregate extends BaseEntityAgregate {
  @CreateDateColumn({ nullable: true })
  public created_At: Date;
  @UpdateDateColumn({ nullable: true })
  public updated_At: Date;
  @DeleteDateColumn({ nullable: true })
  public deleted_At: Date;
}
