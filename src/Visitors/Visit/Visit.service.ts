import { plainToClass } from "class-transformer";
import { LMSUtils } from "../../Utils/fectory";
import { CreateVisitDto } from "./Visit-create.dto";
import { UpdateVisitDto } from "./Visit-update.dto";
import { Visit } from "./Visit.entity";

export class VisitService {
  static add = async (data: CreateVisitDto) => {
    try {
      // if (!data.visit_date) {
      //   let dd = new Date().getDate();
      //   let mm = new Date().getMonth() + 1;
      //   let yyyy = new Date().getFullYear();
      //   let today = yyyy + "-" + mm + "-" + dd;
      //   data.visit_date = today as any;
      // }

      // if (!data.visit_time) {
      //   let time = new Date();
      //   let hh = time.getHours();
      //   let mmm = time.getMinutes();
      //   let ss = time.getSeconds();
      //   let current_time = hh + ":" + mmm + ":" + ss;
      //   data.visit_time = current_time as any;
      // }

      const dto = plainToClass(CreateVisitDto, data);

      const error = await LMSUtils.validator(dto);
      if (error) return error;
      return await Visit.save(await Visit.create(dto));
    } catch (error) {
      return error;
    }
  };

  static update = async (data: UpdateVisitDto) => {
    try {
      const dto = plainToClass(UpdateVisitDto, data);

      const error = await LMSUtils.validator(dto);
      if (error) return error;
      return await Visit.save(await Visit.create(dto));
    } catch (error) {
      return error;
    }
  };
}
