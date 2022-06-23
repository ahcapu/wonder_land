import { Column, Entity } from "typeorm";
import { BaseAuto } from "../../Utils/BaseAuto";

@Entity("guardians")
export class Guardian extends BaseAuto {
  @Column({ nullable: true, type: "varchar" })
  phone_number: string;
}
