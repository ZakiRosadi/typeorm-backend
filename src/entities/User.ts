import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Pemilu } from "./Pemilu";
import { Voter } from "./Voter";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Pemilu, (pemilu) => pemilu.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    pemilu: Pemilu[]

    // @OneToOne(() => Voter)
    // @JoinColumn()
    // voter: Voter
}