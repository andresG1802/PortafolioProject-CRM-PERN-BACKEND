export class CreateClienteDto {
    private constructor(
        public readonly nombre: string,
        public readonly userId: number,
        public readonly empresa?: string,
        public readonly email?: string,
        public readonly telefono?: string,
        public readonly direccion?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateClienteDto?] {
        const { nombre, userId, empresa, email, telefono, direccion } = props;

        if (!nombre) return ['Nombre property is required', undefined];
        if (!userId) return ['UserId property is required', undefined];

        return [undefined, new CreateClienteDto(nombre, userId, empresa, email, telefono, direccion)];
    }
}
