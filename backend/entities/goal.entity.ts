import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsDate } from "class-validator";
import { User } from "./user.entity";

@Entity()
export class Goal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.goals)
  @JoinColumn({ name: "user_id" })
  user: User;
}
