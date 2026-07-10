import { CreateNotaDto } from "../dtos";
import { NotaEntity } from "../entities/nota.entity";

export abstract class NotaRepository {
    abstract create(createNotaDto: CreateNotaDto): Promise<NotaEntity>;
    abstract getAll(): Promise<NotaEntity[]>;
    abstract deleteById(id: number): Promise<NotaEntity>;
}
