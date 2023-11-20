import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}


