import { injectable, inject } from "inversify";
import { PrismaClient } from "../../generated/prisma-client-js";

// prisma装饰器封装
@injectable()
export class PrismaDB {
	prisma: PrismaClient;
	constructor(@inject("PrismaClient") PrismaClient: () => PrismaClient) {
		this.prisma = PrismaClient();
	}
}
