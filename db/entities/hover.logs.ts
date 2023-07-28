import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class logs extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    log: string

    @Column()
    timeCreated: number
}