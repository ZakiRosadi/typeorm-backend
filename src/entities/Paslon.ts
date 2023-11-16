import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Paslon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idOrder: "string";

  @Column()
  namaPaslon: "string";

  @Column()
  visiMisi: "string";

  @Column()
  image: " string ";
}
