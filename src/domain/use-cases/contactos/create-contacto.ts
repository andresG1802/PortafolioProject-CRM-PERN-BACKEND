import { CreateContactoDto } from "../../dtos";
import { ContactoEntity } from "../../entities/contacto.entity";
import { ContactoRepository } from "../../repositories/contacto.repository";

export interface CreateContactoUseCase {
    execute(dto: CreateContactoDto): Promise<ContactoEntity>;
}

export class CreateContacto implements CreateContactoUseCase {
    constructor(
        private readonly repository: ContactoRepository,
    ) {}
    execute(dto: CreateContactoDto): Promise<ContactoEntity> {
        return this.repository.create(dto);
    }
}
