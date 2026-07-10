import { EtapaOportunidad } from "../../entities/oportunidad.entity";

const ETAPAS: EtapaOportunidad[] = ['NUEVO', 'CONTACTADO', 'PROPUESTA', 'NEGOCIACION', 'GANADA', 'PERDIDA'];

export class UpdateOportunidadDto {
    private constructor(
        public readonly id: number,
        public readonly titulo?: string,
        public readonly descripcion?: string,
        public readonly monto?: number,
        public readonly etapa?: EtapaOportunidad,
        public readonly fechaCierreEstimada?: Date,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.titulo) returnObj.titulo = this.titulo;
        if (this.descripcion !== undefined) returnObj.descripcion = this.descripcion;
        if (this.monto !== undefined) returnObj.monto = this.monto;
        if (this.etapa) returnObj.etapa = this.etapa;
        if (this.fechaCierreEstimada) returnObj.fechaCierreEstimada = this.fechaCierreEstimada;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateOportunidadDto?] {
        const { id, titulo, descripcion, monto, etapa, fechaCierreEstimada } = props;

        if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];
        if (monto !== undefined && isNaN(Number(monto))) return ['Monto must be a valid number', undefined];
        if (etapa && !ETAPAS.includes(etapa)) return [`Etapa must be one of ${ETAPAS.join(', ')}`, undefined];

        let newFechaCierre;
        if (fechaCierreEstimada) {
            newFechaCierre = new Date(fechaCierreEstimada);
            if (isNaN(newFechaCierre.getTime())) return ['FechaCierreEstimada is not a valid date', undefined];
        }

        return [
            undefined,
            new UpdateOportunidadDto(
                id,
                titulo,
                descripcion,
                monto !== undefined ? Number(monto) : undefined,
                etapa,
                newFechaCierre,
            ),
        ];
    }
}
