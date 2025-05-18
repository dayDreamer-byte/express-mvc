import { IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class UserDto {
	@IsNotEmpty({ message: "name is required" })
	@Transform((user) => user.value.trim())
	name: string = "";
	@IsNotEmpty({ message: "email is required" })
	email: string = "";
	age: number = 0;
	sex: number = 0;
}
