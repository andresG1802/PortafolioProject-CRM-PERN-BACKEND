import { CreateContactoDto, UpdateContactoDto } from "../dtos";
import { ContactoEntity } from "../entities/contacto.entity";

export abstract class ContactoRepository {
    abstract create(createContactoDto: CreateContactoDto): Promise<ContactoEntity>;
    abstract getAllByCliente(clienteId: number): Promise<ContactoEntity[]>;
    abstract findById(id: number): Promise<ContactoEntity>;
    abstract updateById(updateContactoDto: UpdateContactoDto): Promise<ContactoEntity>;
    abstract deleteById(id: number): Promise<ContactoEntity>;
}
