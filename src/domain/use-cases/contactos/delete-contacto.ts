import { ContactoEntity } from "../../entities/contacto.entity";
import { ContactoRepository } from "../../repositories/contacto.repository";

export interface DeleteContactoUseCase {
    execute(id: number): Promise<ContactoEntity>;
}

export class DeleteContacto implements DeleteContactoUseCase {
    constructor(
        private readonly repository: ContactoRepository,
    ) {}
    execute(id: number): Promise<ContactoEntity> {
        return this.repository.deleteById(id);
    }
}
