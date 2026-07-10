import { UpdateTareaDto } from "../../dtos";
import { TareaEntity } from "../../entities/tarea.entity";
import { TareaRepository } from "../../repositories/tarea.repository";

export interface UpdateTareaUseCase {
    execute(dto: UpdateTareaDto): Promise<TareaEntity>;
}

export class UpdateTarea implements UpdateTareaUseCase {
    constructor(
        private readonly repository: TareaRepository,
    ) {}
    execute(dto: UpdateTareaDto): Promise<TareaEntity> {
        return this.repository.updateById(dto);
    }
}
