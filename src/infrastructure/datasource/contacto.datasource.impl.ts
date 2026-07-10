import { prisma } from "../../data/postgres";
import { ContactoDataSource, ContactoEntity, CreateContactoDto, CustomError, UpdateContactoDto } from "../../domain";

export class ContactoDatasourceImpl implements ContactoDataSource {
    async create(createContactoDto: CreateContactoDto): Promise<ContactoEntity> {
        const cliente = await prisma.cliente.findFirst({ where: { id: createContactoDto.clienteId } });
        if (!cliente) throw CustomError.notFound(`Cliente with id ${createContactoDto.clienteId} not found`);

        const contacto = await prisma.contacto.create({
            data: createContactoDto!,
        });

        return ContactoEntity.fromObject(contacto);
    }

    async getAllByCliente(clienteId: number): Promise<ContactoEntity[]> {
        const contactos = await prisma.contacto.findMany({ where: { clienteId } });

        return contactos.map(contacto => ContactoEntity.fromObject(contacto));
    }

    async findById(id: number): Promise<ContactoEntity> {
        const contacto = await prisma.contacto.findFirst({ where: { id } });

        if (!contacto) throw CustomError.notFound(`Contacto with id ${id} not found`);

        return ContactoEntity.fromObject(contacto);
    }

    async updateById(updateContactoDto: UpdateContactoDto): Promise<ContactoEntity> {
        await this.findById(updateContactoDto.id);

        const contacto = await prisma.contacto.update({
            where: { id: updateContactoDto.id },
            data: updateContactoDto.values,
        });

        return ContactoEntity.fromObject(contacto);
    }

    async deleteById(id: number): Promise<ContactoEntity> {
        await this.findById(id);

        const contacto = await prisma.contacto.delete({ where: { id } });

        return ContactoEntity.fromObject(contacto);
    }
}
