import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { User } from "./User.entity";
import { UserRole, UserStation } from "./UserRoleEnum";

export class UserDto {
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  user: User;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  user_name: string;

  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsEnum(UserStation)
  station: UserStation;
}
