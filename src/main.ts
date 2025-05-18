import express from "express";
import { PrismaDB } from "./db/index";
import { User } from "./user/controller";
import { UserService } from "./user/service";
import { Container, interfaces } from "inversify";
import { PrismaClient } from "../generated/prisma-client-js";
import { InversifyExpressServer } from "inversify-express-utils";

const container = new Container();
/**
 *向容器中注册依赖
 **/
container.bind<User>(User).to(User);
container.bind<UserService>(UserService).toSelf();

// 创建prisma注入工厂，因为prisma是已经存在的class类，无法通过@injectable()装饰器注入，所以需要使用工厂模式
container.bind<PrismaClient>("PrismaClient").toFactory((ctx: interfaces.Context) => {
	return () => {
		return new PrismaClient();
	};
});
// 向容器中注入db依赖
container.bind<PrismaDB>(PrismaDB).toSelf();

/**
 * 创建server 并配置中间件
 */
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
	// 配置中间件 支持post请求
	app.use(express.json());
});
const app = server.build();
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
