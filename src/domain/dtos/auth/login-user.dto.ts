export class LoginUserDto {
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = props;

        if (!email) return ['Email is required', undefined];
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ['Email is not valid', undefined];
        if (!password) return ['Password is required', undefined];

        return [undefined, new LoginUserDto(email, password)];
    }
}
