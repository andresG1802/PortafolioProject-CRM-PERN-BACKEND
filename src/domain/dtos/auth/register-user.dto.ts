export class RegisterUserDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = props;

        if (!name) return ['Name is required', undefined];
        if (!email) return ['Email is required', undefined];
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ['Email is not valid', undefined];
        if (!password || password.length < 6) return ['Password must be at least 6 characters', undefined];

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}
