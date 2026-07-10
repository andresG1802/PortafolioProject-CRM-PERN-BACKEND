import { TareaEntity } from "../../entities/tarea.entity";
import { TareaRepository } from "../../repositories/tarea.repository";

export interface GetTareasUseCase {
    execute(): Promise<TareaEntity[]>;
}

export class GetTareas implements GetTareasUseCase {
    constructor(
        private readonly repository: TareaRepository,
    ) {}
    execute(): Promise<TareaEntity[]> {
        return this.repository.getAll();
    }
}
