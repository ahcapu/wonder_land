import { compare, hash } from "bcryptjs";
import { randomBytes, createHash } from "crypto";
import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { signJwt } from "../auth/Auth";
import { LMSUtils } from "../Utils/fectory";
import { ChangePasswordDto } from "./ChangePassword.dto";
import { SignInDto } from "./SignIn.dto";
import { CreateUserDto } from "./User-create.dto";
import { User } from "./User.entity";
import pug from "pug";

import { ForgotPassword } from "../auth/ForgotPassword";

export class UserService {
  static signUp = async (data: CreateUserDto) => {
    try {
      if (data.user_name) {
        let user = await getRepository(User).findOne({
          where: { user_name: data.user_name },
        });
        if (user) {
          return { error: "User name already exists" };
        }
      }
      const dto = plainToClass(CreateUserDto, data);

      const error = await LMSUtils.validator(dto);
      if (error) return error;

      if (data.password !== data.passwordConfirm) {
        return { message: "Both passwords are not matching" };
      }

      dto.password = await hash(dto.password, 10);

      return await User.save(await User.create(dto));
    } catch (error) {
      return error;
    }
  };

  static signIn = async (data: SignInDto) => {
    try {
      const dto = plainToClass(SignInDto, data);
      const error = await LMSUtils.validator(dto);
      if (error) return error;

      let user = await getRepository(User).query(
        "SELECT id, user_name, password, role, first_name, last_name, phone, station FROM users WHERE user_name = $1",
        [dto.user_name]
      );

      user = user[0];

      if (!user || !(await compare(dto.password, user.password))) {
        return { error: "Incorrect email or password" };
      }
      user.token = signJwt(user.id);
      delete user.password;

      return user;
    } catch (error) {
      return error;
    }
  };

  static getAll = async () => {
    try {
      return await getRepository(User).query(
        'SELECT id, first_name, last_name, email, phone, role, station, "user", updated FROM users'
      );
    } catch (error) {
      return error;
    }
  };

  static getOne = async (id: number) => {
    try {
      return await getRepository(User).query(
        'SELECT id, first_name, last_name, email, phone, role, station, "user", updated FROM users WHERE id = $1',
        [id]
      );
    } catch (error) {
      return error;
    }
  };

  static changePassword = async (data: ChangePasswordDto) => {
    try {
      const dto = plainToClass(ChangePasswordDto, data);

      const error = await LMSUtils.validator(dto);
      if (error) return error;

      if (dto.password !== dto.passwordConfirm) {
        return { error: "both passwords not maches" };
      }

      const user = await getRepository(User).query(
        "SELECT password FROM users WHERE id = $1",
        [dto.id]
      );

      if (user.length > 1) {
        let check = await compare(dto.passwordOld, user[0].password);

        if (!check) {
          return { error: "Your current password is wrong." };
        }
      }

      dto.password = await hash(dto.password, 10);
      await User.update({ id: dto.id }, { password: dto.password });

      return signJwt(dto.id);
    } catch (error) {
      return error;
    }
  };

  static forgotPassword = async (email: string) => {
    try {
      if (!email) {
        return { error: "Please provide email address" };
      }
      let user = await getRepository(User).query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      );
      user = user[0];
      if (!user) {
        return { error: "There is no user with this email address" };
      }

      const resetToken = randomBytes(32).toString("hex");

      let passwordResetToken = createHash("sha256")
        .update(resetToken)
        .digest("hex");

      let passwordResetExpires = Date.now() + 10 * 60 * 1000;

      let update = await User.update(
        { email },
        { passwordResetToken, passwordResetExpires }
      );
      if (update.affected === 1 || "1") {
        return resetToken;
      } else {
        return { error: "something went wrong" };
      }
    } catch (error) {
      return error;
    }
  };
}
