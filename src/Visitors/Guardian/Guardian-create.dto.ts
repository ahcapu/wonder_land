import { IsNotEmpty } from "class-validator";
import { User } from "../../User/User.entity";
import { Guardian } from "./Guardian.entity";

export class CreateGuardianDto extends Guardian {
    @IsNotEmpty()
    user: User;
}
