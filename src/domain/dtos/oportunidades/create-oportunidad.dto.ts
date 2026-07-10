import { EtapaOportunidad } from "../../entities/oportunidad.entity";

const ETAPAS: EtapaOportunidad[] = ['NUEVO', 'CONTACTADO', 'PROPUESTA', 'NEGOCIACION', 'GANADA', 'PERDIDA'];

export class CreateOportunidadDto {
    private constructor(
        public readonly titulo: string,
        public readonly monto: number,
        public readonly clienteId: number,
        public readonly userId: number,
        public readonly descripcion?: string,
        public readonly etapa?: EtapaOportunidad,
        public readonly fechaCierreEstimada?: Date,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateOportunidadDto?] {
        const { titulo, monto, clienteId, userId, descripcion, etapa, fechaCierreEstimada } = props;

        if (!titulo) return ['Titulo property is required', undefined];
        if (monto === undefined || isNaN(Number(monto))) return ['Monto must be a valid number', undefined];
        if (!clienteId || isNaN(Number(clienteId))) return ['ClienteId must be a valid number', undefined];
        if (!userId) return ['UserId property is required', undefined];
        if (etapa && !ETAPAS.includes(etapa)) return [`Etapa must be one of ${ETAPAS.join(', ')}`, undefined];

        let newFechaCierre;
        if (fechaCierreEstimada) {
            newFechaCierre = new Date(fechaCierreEstimada);
            if (isNaN(newFechaCierre.getTime())) return ['FechaCierreEstimada is not a valid date', undefined];
        }

        return [
            undefined,
            new CreateOportunidadDto(titulo, Number(monto), Number(clienteId), userId, descripcion, etapa, newFechaCierre),
        ];
    }
}
