import { NotaEntity } from "../../entities/nota.entity";
import { NotaRepository } from "../../repositories/nota.repository";

export interface DeleteNotaUseCase {
    execute(id: number): Promise<NotaEntity>;
}

export class DeleteNota implements DeleteNotaUseCase {
    constructor(
        private readonly repository: NotaRepository,
    ) {}
    execute(id: number): Promise<NotaEntity> {
        return this.repository.deleteById(id);
    }
}
