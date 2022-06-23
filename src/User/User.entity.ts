import { Column, Entity } from "typeorm";
import { BaseAuto } from "../Utils/BaseAuto";
import { UserRole, UserStation } from "./UserRoleEnum";

@Entity("users")
export class User extends BaseAuto {
  @Column({ nullable: true, type: "boolean", default: true })
  is_active: boolean;

  @Column({ nullable: true, type: "varchar" })
  first_name: string;

  @Column({ nullable: true, type: "varchar" })
  last_name: string;

  @Column({ nullable: true, type: "varchar" })
  email: string;


  @Column({ nullable: true, type: "varchar" })
  user_name: string;

  @Column({ nullable: true, type: "varchar" })
  phone: string;

  @Column({ nullable: false, type: "varchar" })
  password: string;

  // confirmPassword

  @Column({ nullable: true, type: "enum", enum: UserRole, default: UserRole.OPERATOR })
  role: UserRole;

  @Column({ nullable: true, type: "enum", enum: UserStation })
  station: UserStation;

  // Change password / forgot password --- without dto
  @Column({ nullable: true, type: "date" })
  passwordChangedAt: Date;
  @Column({ nullable: true, type: "varchar" })
  passwordResetToken: String;
  @Column({ nullable: true, type: "bigint" })
  passwordResetExpires: number;
}
