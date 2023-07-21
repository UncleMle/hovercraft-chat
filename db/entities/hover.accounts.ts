import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Accounts extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    discordAuth: string

    @Column()
    createdTime: number

    @Column()
    lastActive: number

    @Column()
    ip: string

    @Column()
    banned: boolean
}