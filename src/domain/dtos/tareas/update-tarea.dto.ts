import { TipoTarea } from "../../entities/tarea.entity";

const TIPOS: TipoTarea[] = ['LLAMADA', 'REUNION', 'EMAIL', 'OTRO'];

export class UpdateTareaDto {
    private constructor(
        public readonly id: number,
        public readonly titulo?: string,
        public readonly descripcion?: string,
        public readonly tipo?: TipoTarea,
        public readonly fechaVencimiento?: Date,
        public readonly completada?: boolean,
        public readonly clienteId?: number,
        public readonly oportunidadId?: number,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.titulo) returnObj.titulo = this.titulo;
        if (this.descripcion !== undefined) returnObj.descripcion = this.descripcion;
        if (this.tipo) returnObj.tipo = this.tipo;
        if (this.fechaVencimiento) returnObj.fechaVencimiento = this.fechaVencimiento;
        if (this.completada !== undefined) returnObj.completada = this.completada;
        if (this.clienteId !== undefined) returnObj.clienteId = this.clienteId;
        if (this.oportunidadId !== undefined) returnObj.oportunidadId = this.oportunidadId;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTareaDto?] {
        const { id, titulo, descripcion, tipo, fechaVencimiento, completada, clienteId, oportunidadId } = props;

        if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];
        if (tipo && !TIPOS.includes(tipo)) return [`Tipo must be one of ${TIPOS.join(', ')}`, undefined];

        let newFechaVencimiento;
        if (fechaVencimiento) {
            newFechaVencimiento = new Date(fechaVencimiento);
            if (isNaN(newFechaVencimiento.getTime())) return ['FechaVencimiento is not a valid date', undefined];
        }

        return [
            undefined,
            new UpdateTareaDto(id, titulo, descripcion, tipo, newFechaVencimiento, completada, clienteId, oportunidadId),
        ];
    }
}
