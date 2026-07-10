export class CreateNotaDto {
    private constructor(
        public readonly contenido: string,
        public readonly userId: number,
        public readonly clienteId?: number,
        public readonly oportunidadId?: number,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateNotaDto?] {
        const { contenido, userId, clienteId, oportunidadId } = props;

        if (!contenido) return ['Contenido property is required', undefined];
        if (!userId) return ['UserId property is required', undefined];
        if (clienteId && isNaN(Number(clienteId))) return ['ClienteId must be a valid number', undefined];
        if (oportunidadId && isNaN(Number(oportunidadId))) return ['OportunidadId must be a valid number', undefined];

        return [
            undefined,
            new CreateNotaDto(
                contenido,
                userId,
                clienteId ? Number(clienteId) : undefined,
                oportunidadId ? Number(oportunidadId) : undefined,
            ),
        ];
    }
}
