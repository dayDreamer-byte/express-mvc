import { controller, httpGet as Get, httpPost as Post } from "inversify-express-utils";
import type { Request, Response } from "express";
import { UserService } from "./service";
import { inject } from "inversify";
import { Jwt } from "../jwt";

const { middleware } = new Jwt();
/**
 * 控制层代码编写，@controller()类装饰器，内部实现了inversify的@injectable()装饰器，用于修饰类。
 * 这样类的内部就可以使用@inject()装饰器注入依赖了。
 */
@controller("/user")
export class User {
	// 注入userService依赖
	constructor(@inject(UserService) private readonly userService: UserService) {}

	/**
	 * middleware()中间件装饰器，用于修饰方法，表示该方法需要经过jwt中间件验证
	 */
	@Get("/index", middleware())
	public async getIndex(req: Request, res: Response) {
		try {
			res.send({
				code: 200,
				data: await this.userService.getUser(),
			});
		} catch (error) {
			res.send({
				code: 500,
				data: error,
			});
		}
	}

	@Get("/login")
	public async login(req: Request, res: Response) {
		res.send(
			await this.userService.login({
				name: req.query.name as string,
				email: req.query.email as string,
				age: 0,
				sex: 1,
			})
		);
	}

	@Post("/create")
	public async create(req: Request, res: Response) {
		const user = req.body;
		try {
			res.send({
				code: 200,
				data: await this.userService.createUser(user),
			});
		} catch (error) {
			res.send({
				code: 500,
				data: error,
			});
		}
	}
}
