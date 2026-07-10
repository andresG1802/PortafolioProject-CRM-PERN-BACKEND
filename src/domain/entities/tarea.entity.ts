import { CustomError } from '../errors/custom.error';

export type TipoTarea = 'LLAMADA' | 'REUNION' | 'EMAIL' | 'OTRO';

export class TareaEntity {
    constructor(
        public id: number,
        public titulo: string,
        public tipo: TipoTarea,
        public fechaVencimiento: Date,
        public completada: boolean,
        public userId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public descripcion?: string | null,
        public clienteId?: number | null,
        public oportunidadId?: number | null,
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const { id, titulo, tipo, fechaVencimiento, completada, userId, createdAt, updatedAt, descripcion, clienteId, oportunidadId } = object;
        if (!id) throw CustomError.badRequest('Id is required');
        if (!titulo) throw CustomError.badRequest('Titulo is required');

        return new TareaEntity(
            id,
            titulo,
            tipo,
            fechaVencimiento,
            completada,
            userId,
            createdAt,
            updatedAt,
            descripcion,
            clienteId,
            oportunidadId,
        );
    }
}
