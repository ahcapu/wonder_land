import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseAuto } from "../../Utils/BaseAuto";
import { Guardian } from "../Guardian/Guardian.entity";
import { Kid } from "../Kid/Kid.entity";

@Entity("visits")
export class Visit extends BaseAuto {
  @ManyToOne(() => Guardian, guardian => guardian, {nullable: true, onDelete: "CASCADE"})
  @JoinColumn({name: "guardain_id"})
  guardain_id: Guardian;

  @ManyToOne(() => Kid, kid => kid, {nullable: true, onDelete: "CASCADE"})
  @JoinColumn({name: "kid_id"})
  kid_id: Kid;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  visited_at: Date;

  @Column({ type: "timestamp", nullable: true })
  visit_date: Date;

  @Column({ type: "time", nullable: true })
  visit_time: Date;
}
