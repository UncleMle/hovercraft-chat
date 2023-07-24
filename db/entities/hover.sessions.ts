import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { messageSave } from "../../shared/hover.types";

@Entity()
export class Sessions extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column()
    token: string

    @Column()
    sessionId: string

    @Column()
    ownerID: number

    @Column("text", { array: true, nullable: true })
    messages: messageSave[]

    @Column()
    ownerUUID: string

    @Column()
    timeCreated: number

    @Column()
    createdAt: number

    @CreateDateColumn()
    createdAtDate: Date

    @UpdateDateColumn()
    updatedAtDate: Date

}