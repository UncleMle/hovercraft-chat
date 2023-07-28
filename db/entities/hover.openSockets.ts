import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class openSockets extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column()
    token: string

    @Column()
    socketId: string

    @Column()
    sessionId: string
}