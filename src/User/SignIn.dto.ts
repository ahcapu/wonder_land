import { IsNotEmpty, IsEmail } from "class-validator";

export class SignInDto {
  @IsNotEmpty()
  user_name: string; // *

  @IsNotEmpty()
  password: string; // *
}
