import { IsNotEmpty } from "class-validator";
import { User } from "../../User/User.entity";
import { Guardian } from "./Guardian.entity";

export class UpdateGuardianDto extends Guardian {
  @IsNotEmpty()
  updated: User;
  @IsNotEmpty()
  id: number;
}
