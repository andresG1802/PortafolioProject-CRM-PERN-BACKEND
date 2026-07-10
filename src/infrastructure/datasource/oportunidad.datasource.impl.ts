import { prisma } from "../../data/postgres";
import { CreateOportunidadDto, CustomError, OportunidadDataSource, OportunidadEntity, UpdateOportunidadDto } from "../../domain";

export class OportunidadDatasourceImpl implements OportunidadDataSource {
    async create(createOportunidadDto: CreateOportunidadDto): Promise<OportunidadEntity> {
        const cliente = await prisma.cliente.findFirst({ where: { id: createOportunidadDto.clienteId } });
        if (!cliente) throw CustomError.notFound(`Cliente with id ${createOportunidadDto.clienteId} not found`);

        const oportunidad = await prisma.oportunidad.create({
            data: createOportunidadDto!,
        });

        return OportunidadEntity.fromObject(oportunidad);
    }

    async getAll(): Promise<OportunidadEntity[]> {
        const oportunidades = await prisma.oportunidad.findMany({ orderBy: { createdAt: 'desc' } });

        return oportunidades.map(oportunidad => OportunidadEntity.fromObject(oportunidad));
    }

    async findById(id: number): Promise<OportunidadEntity> {
        const oportunidad = await prisma.oportunidad.findFirst({ where: { id } });

        if (!oportunidad) throw CustomError.notFound(`Oportunidad with id ${id} not found`);

        return OportunidadEntity.fromObject(oportunidad);
    }

    async updateById(updateOportunidadDto: UpdateOportunidadDto): Promise<OportunidadEntity> {
        await this.findById(updateOportunidadDto.id);

        const oportunidad = await prisma.oportunidad.update({
            where: { id: updateOportunidadDto.id },
            data: updateOportunidadDto.values,
        });

        return OportunidadEntity.fromObject(oportunidad);
    }

    async deleteById(id: number): Promise<OportunidadEntity> {
        await this.findById(id);

        const oportunidad = await prisma.oportunidad.delete({ where: { id } });

        return OportunidadEntity.fromObject(oportunidad);
    }
}
