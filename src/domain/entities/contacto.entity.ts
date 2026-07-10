import { CustomError } from '../errors/custom.error';

export class ContactoEntity {
    constructor(
        public id: number,
        public nombre: string,
        public clienteId: number,
        public cargo?: string | null,
        public email?: string | null,
        public telefono?: string | null,
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const { id, nombre, clienteId, cargo, email, telefono } = object;
        if (!id) throw CustomError.badRequest('Id is required');
        if (!nombre) throw CustomError.badRequest('Nombre is required');

        return new ContactoEntity(id, nombre, clienteId, cargo, email, telefono);
    }
}
