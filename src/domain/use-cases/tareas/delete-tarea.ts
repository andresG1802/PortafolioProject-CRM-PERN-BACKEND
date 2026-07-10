import { TareaEntity } from "../../entities/tarea.entity";
import { TareaRepository } from "../../repositories/tarea.repository";

export interface DeleteTareaUseCase {
    execute(id: number): Promise<TareaEntity>;
}

export class DeleteTarea implements DeleteTareaUseCase {
    constructor(
        private readonly repository: TareaRepository,
    ) {}
    execute(id: number): Promise<TareaEntity> {
        return this.repository.deleteById(id);
    }
}
