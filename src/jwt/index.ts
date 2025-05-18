import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import jsonwebtoken from "jsonwebtoken";
import { injectable } from "inversify";
import passport from "passport";

/**
 * 封装jwt工具
 * 1. 用于登录时创建token，基于用户信息等palyload
 * 2. 提供中间件函数
 */
@injectable()
export class Jwt {
	private secret: string = "expressmvc@#$!%&*()_+!#@#";
	private jwtOptions = {
		// secretOrKey: 密钥
		secretOrKey: this.secret,
		// jwtFromRequest: 从哪里获取token
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	};

	constructor() {
		this.strategy();
	}

	// 初始化jwt
	public strategy() {
		const strategy = new Strategy(this.jwtOptions, (payload, done) => {
			// 验证token
			// payload 为解密后的数据
			// 通过done回调函数返回验证结果
			// done(null, false) 未通过验证
			// done(null, true) 通过验证
			// done(err) 失败
			done(null, payload);
		});
		passport.use(strategy);
	}

	/**
	 * 用于inversify-express-utils的路由装饰器的第二个参数。
	 * @returns
	 */
	public middleware() {
		return passport.authenticate("jwt", { session: false });
	}

	/**
	 * 创建token
	 */
	public createToken(data: object) {
		// 默认采用 HMAC SHA256
		// payload、secret、options
		return jsonwebtoken.sign(data, this.secret, { expiresIn: "7d" });
	}
}
