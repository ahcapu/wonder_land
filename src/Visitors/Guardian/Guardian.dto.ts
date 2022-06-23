import { IsNotEmpty } from "class-validator";

export class GuardianDto {
  @IsNotEmpty()
  phone_number: string;
}
