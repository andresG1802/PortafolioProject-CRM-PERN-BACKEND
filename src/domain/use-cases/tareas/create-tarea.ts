import { CreateTareaDto } from "../../dtos";
import { TareaEntity } from "../../entities/tarea.entity";
import { TareaRepository } from "../../repositories/tarea.repository";

export interface CreateTareaUseCase {
    execute(dto: CreateTareaDto): Promise<TareaEntity>;
}

export class CreateTarea implements CreateTareaUseCase {
    constructor(
        private readonly repository: TareaRepository,
    ) {}
    execute(dto: CreateTareaDto): Promise<TareaEntity> {
        return this.repository.create(dto);
    }
}
