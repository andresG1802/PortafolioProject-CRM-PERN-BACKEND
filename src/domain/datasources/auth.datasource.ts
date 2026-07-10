import { LoginUserDto, RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
