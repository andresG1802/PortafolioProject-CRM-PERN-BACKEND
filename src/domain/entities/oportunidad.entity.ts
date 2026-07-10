import { CustomError } from '../errors/custom.error';

export type EtapaOportunidad = 'NUEVO' | 'CONTACTADO' | 'PROPUESTA' | 'NEGOCIACION' | 'GANADA' | 'PERDIDA';

export class OportunidadEntity {
    constructor(
        public id: number,
        public titulo: string,
        public monto: number,
        public etapa: EtapaOportunidad,
        public clienteId: number,
        public userId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public descripcion?: string | null,
        public fechaCierreEstimada?: Date | null,
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const { id, titulo, monto, etapa, clienteId, userId, createdAt, updatedAt, descripcion, fechaCierreEstimada } = object;
        if (!id) throw CustomError.badRequest('Id is required');
        if (!titulo) throw CustomError.badRequest('Titulo is required');

        return new OportunidadEntity(
            id,
            titulo,
            Number(monto),
            etapa,
            clienteId,
            userId,
            createdAt,
            updatedAt,
            descripcion,
            fechaCierreEstimada,
        );
    }
}
