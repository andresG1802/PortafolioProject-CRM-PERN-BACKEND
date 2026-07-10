import { prisma } from "../../data/postgres";
import { CreateTareaDto, CustomError, TareaDataSource, TareaEntity, UpdateTareaDto } from "../../domain";

export class TareaDatasourceImpl implements TareaDataSource {
    async create(createTareaDto: CreateTareaDto): Promise<TareaEntity> {
        if (createTareaDto.clienteId) {
            const cliente = await prisma.cliente.findFirst({ where: { id: createTareaDto.clienteId } });
            if (!cliente) throw CustomError.notFound(`Cliente with id ${createTareaDto.clienteId} not found`);
        }
        if (createTareaDto.oportunidadId) {
            const oportunidad = await prisma.oportunidad.findFirst({ where: { id: createTareaDto.oportunidadId } });
            if (!oportunidad) throw CustomError.notFound(`Oportunidad with id ${createTareaDto.oportunidadId} not found`);
        }

        const tarea = await prisma.tarea.create({
            data: createTareaDto!,
        });

        return TareaEntity.fromObject(tarea);
    }

    async getAll(): Promise<TareaEntity[]> {
        const tareas = await prisma.tarea.findMany({ orderBy: { fechaVencimiento: 'asc' } });

        return tareas.map(tarea => TareaEntity.fromObject(tarea));
    }

    async findById(id: number): Promise<TareaEntity> {
        const tarea = await prisma.tarea.findFirst({ where: { id } });

        if (!tarea) throw CustomError.notFound(`Tarea with id ${id} not found`);

        return TareaEntity.fromObject(tarea);
    }

    async updateById(updateTareaDto: UpdateTareaDto): Promise<TareaEntity> {
        await this.findById(updateTareaDto.id);

        const tarea = await prisma.tarea.update({
            where: { id: updateTareaDto.id },
            data: updateTareaDto.values,
        });

        return TareaEntity.fromObject(tarea);
    }

    async deleteById(id: number): Promise<TareaEntity> {
        await this.findById(id);

        const tarea = await prisma.tarea.delete({ where: { id } });

        return TareaEntity.fromObject(tarea);
    }
}
