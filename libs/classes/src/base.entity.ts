import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export abstract class BaseEntity{
    @PrimaryColumn('uuid')
    id: string
}