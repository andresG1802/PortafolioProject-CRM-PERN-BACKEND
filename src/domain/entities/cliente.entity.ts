import { CustomError } from '../errors/custom.error';

export class ClienteEntity {
    constructor(
        public id: number,
        public nombre: string,
        public estado: 'ACTIVO' | 'INACTIVO',
        public userId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public empresa?: string | null,
        public email?: string | null,
        public telefono?: string | null,
        public direccion?: string | null,
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const { id, nombre, estado, userId, createdAt, updatedAt, empresa, email, telefono, direccion } = object;
        if (!id) throw CustomError.badRequest('Id is required');
        if (!nombre) throw CustomError.badRequest('Nombre is required');

        return new ClienteEntity(id, nombre, estado, userId, createdAt, updatedAt, empresa, email, telefono, direccion);
    }
}
