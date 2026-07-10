import { CreateNotaDto } from "../../dtos";
import { NotaEntity } from "../../entities/nota.entity";
import { NotaRepository } from "../../repositories/nota.repository";

export interface CreateNotaUseCase {
    execute(dto: CreateNotaDto): Promise<NotaEntity>;
}

export class CreateNota implements CreateNotaUseCase {
    constructor(
        private readonly repository: NotaRepository,
    ) {}
    execute(dto: CreateNotaDto): Promise<NotaEntity> {
        return this.repository.create(dto);
    }
}
