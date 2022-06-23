import { IsNotEmpty } from "class-validator";
import { User } from "../../User/User.entity";
import { Visit } from "./Visit.entity";

export class UpdateVisitDto extends Visit {
  @IsNotEmpty()
  updated: User;
  @IsNotEmpty()
  id: number;
}
