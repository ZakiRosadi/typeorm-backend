import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Partai } from "./Partai";
import { Voter } from "./Voter";

@Entity({ name: "paslon" })
export class Paslon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idOrder: number;

  @Column()
  namaPaslon: string;

  @Column()
  visiMisi: string;

  @Column()
  image: string;

  @OneToMany(() => Partai, (partai) => partai.paslon, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  Partai: Partai[]

  @ManyToMany(() => Voter, (voter) => voter.paslon, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  voter: Voter


}
