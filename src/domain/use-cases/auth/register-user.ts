import { JwtAdapter } from "../../../config/jwt.adapter";
import { RegisterUserDto } from "../../dtos";
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

export interface RegisterUserUseCase {
    execute(dto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private readonly repository: AuthRepository,
    ) {}

    async execute(dto: RegisterUserDto): Promise<UserToken> {
        const user = await this.repository.register(dto);

        const token = await JwtAdapter.generateToken({ id: user.id, role: user.role });
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    }
}
