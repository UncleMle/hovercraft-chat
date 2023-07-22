import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Accounts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn("uuid")
    UUID: string

    @Column()
    username: string

    @Column()
    password: string

    @Column('simple-json', { nullable: true })
    discordData: string

    @Column()
    createdTime: number

    @Column()
    lastActive: number

    @Column()
    totalChatSessions: number

    @Column("text", { array: true, nullable: true })
    notifications: string[]

    @Column("text", { array: true, nullable: true })
    adminPunishments: string[]

    @Column()
    ip: string

    @Column()
    banned: boolean
}