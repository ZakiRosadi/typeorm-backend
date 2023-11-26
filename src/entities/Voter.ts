import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Paslon } from "./Paslon";
@Entity()
export class Voter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column()
    paslonId: number;
    @ManyToOne(() => Paslon, (paslon) => paslon.voter, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    paslon: Paslon;


}
