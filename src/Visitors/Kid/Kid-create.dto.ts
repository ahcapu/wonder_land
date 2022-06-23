import { IsNotEmpty } from "class-validator";
import { User } from "../../User/User.entity";
import { Kid } from "./Kid.entity";

export class CreateKidDto extends Kid {
  @IsNotEmpty()
  user: User;
}
