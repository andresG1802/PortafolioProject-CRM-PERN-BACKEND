import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { prisma } from "../../data/postgres";
import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDataSource {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const exists = await prisma.user.findUnique({ where: { email: registerUserDto.email } });
        if (exists) throw CustomError.badRequest('Email already in use');

        const user = await prisma.user.create({
            data: {
                name: registerUserDto.name,
                email: registerUserDto.email,
                password: BcryptAdapter.hash(registerUserDto.password),
            },
        });

        return UserEntity.fromObject(user);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await prisma.user.findUnique({ where: { email: loginUserDto.email } });
        if (!user) throw CustomError.unauthorized('Invalid credentials');
        if (!user.isActive) throw CustomError.unauthorized('User is inactive');

        const isMatching = BcryptAdapter.compare(loginUserDto.password, user.password);
        if (!isMatching) throw CustomError.unauthorized('Invalid credentials');

        return UserEntity.fromObject(user);
    }
}
