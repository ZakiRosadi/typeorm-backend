import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

}