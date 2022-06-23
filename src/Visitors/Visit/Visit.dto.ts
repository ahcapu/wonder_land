import { IsNotEmpty, IsOptional } from "class-validator";
import { Guardian } from "../Guardian/Guardian.entity";
import { Kid } from "../Kid/Kid.entity";

export class VisitDto {
  @IsNotEmpty()
  guardain_id: Guardian;

  @IsNotEmpty()
  kid_id: Kid;

  @IsOptional()
  visited_at: Date;

  @IsOptional()
  visit_date: Date;

  @IsOptional()
  visit_time: Date;
}
