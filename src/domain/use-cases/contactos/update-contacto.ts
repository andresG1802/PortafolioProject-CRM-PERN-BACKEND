import { UpdateContactoDto } from "../../dtos";
import { ContactoEntity } from "../../entities/contacto.entity";
import { ContactoRepository } from "../../repositories/contacto.repository";

export interface UpdateContactoUseCase {
    execute(dto: UpdateContactoDto): Promise<ContactoEntity>;
}

export class UpdateContacto implements UpdateContactoUseCase {
    constructor(
        private readonly repository: ContactoRepository,
    ) {}
    execute(dto: UpdateContactoDto): Promise<ContactoEntity> {
        return this.repository.updateById(dto);
    }
}
