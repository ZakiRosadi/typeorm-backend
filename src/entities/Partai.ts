import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { Paslon } from "./Paslon";


@Entity()
export class Partai {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    namaPartai: string;

    @Column()
    ketuaUmum: string;

    @Column()
    visiMisi: string;

    @Column()
    alamat: string;

    @Column()
    image: string;

    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    postedAt: Date;

    @ManyToOne(() => Paslon, (paslon) => paslon.Partai, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",

    })
    paslon: Paslon
}


