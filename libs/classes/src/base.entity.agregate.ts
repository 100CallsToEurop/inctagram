import { AggregateRoot } from "@nestjs/cqrs";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export abstract class BaseEntityAgregate extends AggregateRoot{
    @PrimaryColumn('uuid')
    id: string
}