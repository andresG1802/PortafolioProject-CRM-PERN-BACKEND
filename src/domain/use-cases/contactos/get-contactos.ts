import { ContactoEntity } from "../../entities/contacto.entity";
import { ContactoRepository } from "../../repositories/contacto.repository";

export interface GetContactosUseCase {
    execute(clienteId: number): Promise<ContactoEntity[]>;
}

export class GetContactos implements GetContactosUseCase {
    constructor(
        private readonly repository: ContactoRepository,
    ) {}
    execute(clienteId: number): Promise<ContactoEntity[]> {
        return this.repository.getAllByCliente(clienteId);
    }
}
