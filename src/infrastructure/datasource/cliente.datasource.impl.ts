import { prisma } from "../../data/postgres";
import { ClienteDataSource, ClienteEntity, CreateClienteDto, CustomError, UpdateClienteDto } from "../../domain";

export class ClienteDatasourceImpl implements ClienteDataSource {
    async create(createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
        const cliente = await prisma.cliente.create({
            data: createClienteDto!,
        });

        return ClienteEntity.fromObject(cliente);
    }

    async getAll(): Promise<ClienteEntity[]> {
        const clientes = await prisma.cliente.findMany({ orderBy: { createdAt: 'desc' } });

        return clientes.map(cliente => ClienteEntity.fromObject(cliente));
    }

    async findById(id: number): Promise<ClienteEntity> {
        const cliente = await prisma.cliente.findFirst({ where: { id } });

        if (!cliente) throw CustomError.notFound(`Cliente with id ${id} not found`);

        return ClienteEntity.fromObject(cliente);
    }

    async updateById(updateClienteDto: UpdateClienteDto): Promise<ClienteEntity> {
        await this.findById(updateClienteDto.id);

        const cliente = await prisma.cliente.update({
            where: { id: updateClienteDto.id },
            data: updateClienteDto.values,
        });

        return ClienteEntity.fromObject(cliente);
    }

    async deleteById(id: number): Promise<ClienteEntity> {
        await this.findById(id);

        const cliente = await prisma.cliente.delete({ where: { id } });

        return ClienteEntity.fromObject(cliente);
    }
}
