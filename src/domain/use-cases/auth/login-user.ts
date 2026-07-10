import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export interface LoginUserUseCase {
    execute(dto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly repository: AuthRepository,
    ) {}

    async execute(dto: LoginUserDto): Promise<UserToken> {
        const user = await this.repository.login(dto);

        const token = await JwtAdapter.generateToken({ id: user.id, role: user.role });
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    }
}
