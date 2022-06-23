import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { LMSUtils } from "../../Utils/fectory";
import { CreateKidDto } from "./Kid-create.dto";
import { UpdateKidDto } from "./Kid-update.dto";
import { Kid } from "./Kid.entity";

export class KidService {
  static add = async (data: CreateKidDto) => {
    try {
      const dto = plainToClass(CreateKidDto, data);

      const error = await LMSUtils.validator(dto);
      if (error) return error;

      let k = await getRepository(Kid).query(
        "SELECT k.id, k.name, k.date_of_birth, k.guardain_id, k.gender FROM kids AS k JOIN guardians AS g ON g.id = k.guardain_id WHERE k.name = $1 AND g.id = $2",
        [dto.name, dto.guardain_id]
      );

      k = k[0];
      if (k) {
        return { message: "success", kid_id: k.id };
      }

      return await Kid.save(await Kid.create(dto));
    } catch (error) {
      return error;
    }
  };

  static update = async (data: UpdateKidDto) => {
    try {
      const dto = plainToClass(UpdateKidDto, data);

      const error = await LMSUtils.validator(dto);
      if (error) return error;
      return await Kid.save(await Kid.create(dto));
    } catch (error) {
      return error;
    }
  };
}
