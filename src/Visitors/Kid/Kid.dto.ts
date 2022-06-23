import { IsNotEmpty, IsOptional } from "class-validator";
import { Guardian } from "../Guardian/Guardian.entity";

export class KidDto {
  @IsNotEmpty()
  guardain_id: Guardian;
  @IsNotEmpty()
  name: string;

  @IsOptional()
  date_of_birth: Date;

  @IsOptional()
  gender: string;
}
