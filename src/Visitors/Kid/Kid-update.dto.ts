import { IsNotEmpty } from "class-validator";
import { User } from "../../User/User.entity";
import { Kid } from "./Kid.entity";

export class UpdateKidDto extends Kid {
  @IsNotEmpty()
  updated: User;
  @IsNotEmpty()
  id: number;
}
