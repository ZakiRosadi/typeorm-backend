import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pemilu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  author: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  postedAt: Date;
}
