import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { messageSave, SessionUser } from '@types';

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

    @Column("simple-json", { array: true, nullable: true })
    messages: messageSave[]

    @Column("jsonb", { nullable: true })
    users: SessionUser[]

    @Column()
    ownerUUID: string

    @Column()
    private: boolean

    @Column()
    timeCreated: number

    @Column()
    createdAt: number

    @CreateDateColumn()
    createdAtDate: Date

    @UpdateDateColumn()
    updatedAtDate: Date

}