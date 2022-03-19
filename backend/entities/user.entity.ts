import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { IsDate, IsEmail } from "class-validator";
import { Goal } from "./goal.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @OneToMany(() => Goal, (goal) => goal.user, {
    cascade: true,
  })
  goals: Goal[];
}
