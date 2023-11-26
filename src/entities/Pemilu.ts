import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";


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

  @ManyToOne(() => User, (user) => user.pemilu, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  user: User
}
