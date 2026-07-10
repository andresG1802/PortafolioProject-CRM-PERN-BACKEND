import { CustomError } from '../errors/custom.error';

export class NotaEntity {
    constructor(
        public id: number,
        public contenido: string,
        public userId: number,
        public createdAt: Date,
        public clienteId?: number | null,
        public oportunidadId?: number | null,
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const { id, contenido, userId, createdAt, clienteId, oportunidadId } = object;
        if (!id) throw CustomError.badRequest('Id is required');
        if (!contenido) throw CustomError.badRequest('Contenido is required');

        return new NotaEntity(id, contenido, userId, createdAt, clienteId, oportunidadId);
    }
}
