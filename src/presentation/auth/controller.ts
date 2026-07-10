import { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUserDto, LoginUser, RegisterUserDto, RegisterUser } from "../../domain";

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    public registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(data => res.status(201).json(data))
            .catch(error => this.handleError(error, res));
    };

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
}
