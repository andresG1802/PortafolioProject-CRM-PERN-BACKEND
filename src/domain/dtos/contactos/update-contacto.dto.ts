export class UpdateContactoDto {
    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly cargo?: string,
        public readonly email?: string,
        public readonly telefono?: string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.cargo !== undefined) returnObj.cargo = this.cargo;
        if (this.email !== undefined) returnObj.email = this.email;
        if (this.telefono !== undefined) returnObj.telefono = this.telefono;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateContactoDto?] {
        const { id, nombre, cargo, email, telefono } = props;

        if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];

        return [undefined, new UpdateContactoDto(id, nombre, cargo, email, telefono)];
    }
}
