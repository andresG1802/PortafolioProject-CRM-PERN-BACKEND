import { TipoTarea } from "../../entities/tarea.entity";

const TIPOS: TipoTarea[] = ['LLAMADA', 'REUNION', 'EMAIL', 'OTRO'];

export class CreateTareaDto {
    private constructor(
        public readonly titulo: string,
        public readonly fechaVencimiento: Date,
        public readonly userId: number,
        public readonly descripcion?: string,
        public readonly tipo?: TipoTarea,
        public readonly clienteId?: number,
        public readonly oportunidadId?: number,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateTareaDto?] {
        const { titulo, fechaVencimiento, userId, descripcion, tipo, clienteId, oportunidadId } = props;

        if (!titulo) return ['Titulo property is required', undefined];
        if (!userId) return ['UserId property is required', undefined];
        if (!fechaVencimiento) return ['FechaVencimiento property is required', undefined];
        if (tipo && !TIPOS.includes(tipo)) return [`Tipo must be one of ${TIPOS.join(', ')}`, undefined];

        const newFechaVencimiento = new Date(fechaVencimiento);
        if (isNaN(newFechaVencimiento.getTime())) return ['FechaVencimiento is not a valid date', undefined];

        if (clienteId && isNaN(Number(clienteId))) return ['ClienteId must be a valid number', undefined];
        if (oportunidadId && isNaN(Number(oportunidadId))) return ['OportunidadId must be a valid number', undefined];

        return [
            undefined,
            new CreateTareaDto(
                titulo,
                newFechaVencimiento,
                userId,
                descripcion,
                tipo,
                clienteId ? Number(clienteId) : undefined,
                oportunidadId ? Number(oportunidadId) : undefined,
            ),
        ];
    }
}
