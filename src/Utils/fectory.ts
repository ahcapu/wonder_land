import { validate } from "class-validator";
export class LMSUtils {
  static validator = async (dto: any) => {
    const errors = await validate(dto);
    if (errors.length) {
      for (let i = 0; i < errors.length; i++) {
        const element = errors[i];

        return element.constraints;
      }
    }
  };
}

export abstract class Token {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
