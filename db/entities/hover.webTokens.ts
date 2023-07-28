import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class webTokens extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column()
    token: string

    @Column()
    sessionId: string

    @Column()
    adminLevel: number

    @Column()
    accountId: number

    @Column()
    accountUUID: string

    @Column()
    timeCreated: number

    @Column()
    createdAt: number

    @CreateDateColumn()
    createdAtDate: Date

    @UpdateDateColumn()
    updatedAtDate: Date

}