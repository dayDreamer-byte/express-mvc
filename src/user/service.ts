import { PrismaDB } from "../db";
import { UserDto } from "./user.dto";
import { validate } from "class-validator";
import { inject, injectable } from "inversify";
import { plainToClass } from "class-transformer";

/**
 * 服务层代码编写，@injectable()装饰器，用于修饰类。
 * 这样类的内部就可以使用@inject()装饰器注入依赖了。
 * 并且可以通过容器绑定这个类，让其他类可以注入这个类。
 */
@injectable()
export class UserService {
	// 注入PrismaDB依赖
	constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {}
	// 这里会有异步传染性
	async getUser() {
		return await this.PrismaDB.prisma.user.findMany();
	}

	async createUser(user: UserDto) {
		const userDto = plainToClass(UserDto, user);
		const errors = await validate(userDto);
		if (errors.length > 0) {
			return errors;
		} else {
			return await this.PrismaDB.prisma.user.create({
				data: userDto,
			});
		}
	}
}
