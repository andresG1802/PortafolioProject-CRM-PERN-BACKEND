import { prisma } from "../../data/postgres";
import { CreateNotaDto, CustomError, NotaDataSource, NotaEntity } from "../../domain";

export class NotaDatasourceImpl implements NotaDataSource {
    async create(createNotaDto: CreateNotaDto): Promise<NotaEntity> {
        if (createNotaDto.clienteId) {
            const cliente = await prisma.cliente.findFirst({ where: { id: createNotaDto.clienteId } });
            if (!cliente) throw CustomError.notFound(`Cliente with id ${createNotaDto.clienteId} not found`);
        }
        if (createNotaDto.oportunidadId) {
            const oportunidad = await prisma.oportunidad.findFirst({ where: { id: createNotaDto.oportunidadId } });
            if (!oportunidad) throw CustomError.notFound(`Oportunidad with id ${createNotaDto.oportunidadId} not found`);
        }

        const nota = await prisma.nota.create({
            data: createNotaDto!,
        });

        return NotaEntity.fromObject(nota);
    }

    async getAll(): Promise<NotaEntity[]> {
        const notas = await prisma.nota.findMany({ orderBy: { createdAt: 'desc' } });

        return notas.map(nota => NotaEntity.fromObject(nota));
    }

    async deleteById(id: number): Promise<NotaEntity> {
        const nota = await prisma.nota.findFirst({ where: { id } });
        if (!nota) throw CustomError.notFound(`Nota with id ${id} not found`);

        const deleted = await prisma.nota.delete({ where: { id } });

        return NotaEntity.fromObject(deleted);
    }
}
