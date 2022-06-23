import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseAuto } from "../../Utils/BaseAuto";
import { Guardian } from "../Guardian/Guardian.entity";

@Entity("kids")
export class Kid extends BaseAuto {
  @ManyToOne(() => Guardian, guardian => guardian, {nullable: true, onDelete: "CASCADE"})
  @JoinColumn({name: "guardain_id"})
  guardain_id: Guardian;
  
  @Column({ nullable: true, type: "varchar" })
  name: string;

  @Column({ nullable: true, type: 'timestamp' })
  date_of_birth: Date;

  @Column({ nullable: true, type: "varchar" })
  gender: string;
}
