import { IsNotEmpty } from "class-validator";
import { User } from "../../User/User.entity";
import { Visit } from "./Visit.entity";

export class CreateVisitDto extends Visit {
    @IsNotEmpty()
    user: User;
}
