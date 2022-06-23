import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
  @IsNotEmpty()
  passwordOld: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  passwordConfirm: string;
}
