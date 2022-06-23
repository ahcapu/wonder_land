import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { UserDto } from "./User.dto";

export class UpdateUserDto extends UserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
