import { IsNotEmpty } from "class-validator";
import { UserDto } from "./User.dto";

export class CreateUserDto extends UserDto {
  @IsNotEmpty()
  passwordConfirm: string;
}
