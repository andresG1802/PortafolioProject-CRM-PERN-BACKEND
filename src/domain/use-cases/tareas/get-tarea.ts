import { TareaEntity } from "../../entities/tarea.entity";
import { TareaRepository } from "../../repositories/tarea.repository";

export interface GetTareaUseCase {
    execute(id: number): Promise<TareaEntity>;
}

export class GetTarea implements GetTareaUseCase {
    constructor(
        private readonly repository: TareaRepository,
    ) {}
    execute(id: number): Promise<TareaEntity> {
        return this.repository.findById(id);
    }
}
