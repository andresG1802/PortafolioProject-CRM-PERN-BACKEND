import { CreateTareaDto, UpdateTareaDto } from "../dtos";
import { TareaEntity } from "../entities/tarea.entity";

export abstract class TareaRepository {
    abstract create(createTareaDto: CreateTareaDto): Promise<TareaEntity>;
    abstract getAll(): Promise<TareaEntity[]>;
    abstract findById(id: number): Promise<TareaEntity>;
    abstract updateById(updateTareaDto: UpdateTareaDto): Promise<TareaEntity>;
    abstract deleteById(id: number): Promise<TareaEntity>;
}
