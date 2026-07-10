export class CreateContactoDto {
    private constructor(
        public readonly nombre: string,
        public readonly clienteId: number,
        public readonly cargo?: string,
        public readonly email?: string,
        public readonly telefono?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateContactoDto?] {
        const { nombre, clienteId, cargo, email, telefono } = props;

        if (!nombre) return ['Nombre property is required', undefined];
        if (!clienteId || isNaN(Number(clienteId))) return ['ClienteId must be a valid number', undefined];

        return [undefined, new CreateContactoDto(nombre, Number(clienteId), cargo, email, telefono)];
    }
}
