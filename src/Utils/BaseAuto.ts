import {
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../User/User.entity";

export class BaseAuto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user, {
    nullable: true,
  })
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToOne(() => User, (user) => user, {
    nullable: true,
  })
  @JoinColumn({ name: "updated" })
  updated: User;
}
