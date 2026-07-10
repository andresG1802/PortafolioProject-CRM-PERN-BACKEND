export class UpdateClienteDto {
    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly empresa?: string,
        public readonly email?: string,
        public readonly telefono?: string,
        public readonly direccion?: string,
        public readonly estado?: 'ACTIVO' | 'INACTIVO',
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.empresa !== undefined) returnObj.empresa = this.empresa;
        if (this.email !== undefined) returnObj.email = this.email;
        if (this.telefono !== undefined) returnObj.telefono = this.telefono;
        if (this.direccion !== undefined) returnObj.direccion = this.direccion;
        if (this.estado) returnObj.estado = this.estado;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateClienteDto?] {
        const { id, nombre, empresa, email, telefono, direccion, estado } = props;

        if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];
        if (estado && !['ACTIVO', 'INACTIVO'].includes(estado)) return ['estado must be ACTIVO or INACTIVO', undefined];

        return [undefined, new UpdateClienteDto(id, nombre, empresa, email, telefono, direccion, estado)];
    }
}
