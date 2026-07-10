import { NotaEntity } from "../../entities/nota.entity";
import { NotaRepository } from "../../repositories/nota.repository";

export interface GetNotasUseCase {
    execute(): Promise<NotaEntity[]>;
}

export class GetNotas implements GetNotasUseCase {
    constructor(
        private readonly repository: NotaRepository,
    ) {}
    execute(): Promise<NotaEntity[]> {
        return this.repository.getAll();
    }
}
