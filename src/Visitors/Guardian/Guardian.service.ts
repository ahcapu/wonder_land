import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { LMSUtils } from "../../Utils/fectory";
import { CreateGuardianDto } from "./Guardian-create.dto";
import { UpdateGuardianDto } from "./Guardian-update.dto";
import { Guardian } from "./Guardian.entity";

export class GuardianService {
  static add = async (data: CreateGuardianDto) => {
    try {
      const dto = plainToClass(CreateGuardianDto, data);
      const error = await LMSUtils.validator(dto);
      if (error) return error;

      let g = await getRepository(Guardian).findOne({
        where: { phone_number: dto.phone_number },
      });
      if (g) {
        return g;
      }

      if (g) {
        return { message: "Guardian already exists" };
      }
      return await Guardian.save(await Guardian.create(dto));
    } catch (error) {
      return error;
    }
  };

  static update = async (data: UpdateGuardianDto) => {
    try {
      const dto = plainToClass(UpdateGuardianDto, data);

      const error = await LMSUtils.validator(dto);
      if (error) return error;
      return await Guardian.save(await Guardian.create(dto));
    } catch (error) {
      return error;
    }
  };
}
