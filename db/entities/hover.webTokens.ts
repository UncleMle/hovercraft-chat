import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class webTokens extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @Column()
    sessionId: string

    @Column()
    timeCreated: number

}