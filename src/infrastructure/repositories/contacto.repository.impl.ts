import { ContactoDataSource, ContactoEntity, ContactoRepository, CreateContactoDto, UpdateContactoDto } from "../../domain";

export class ContactoRepositoryImpl implements ContactoRepository {
    constructor(
        private readonly datasource: ContactoDataSource,
    ) {}
    create(createContactoDto: CreateContactoDto): Promise<ContactoEntity> {
        return this.datasource.create(createContactoDto);
    }
    getAllByCliente(clienteId: number): Promise<ContactoEntity[]> {
        return this.datasource.getAllByCliente(clienteId);
    }
    findById(id: number): Promise<ContactoEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateContactoDto: UpdateContactoDto): Promise<ContactoEntity> {
        return this.datasource.updateById(updateContactoDto);
    }
    deleteById(id: number): Promise<ContactoEntity> {
        return this.datasource.deleteById(id);
    }
}
