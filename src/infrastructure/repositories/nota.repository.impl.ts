import { CreateNotaDto, NotaDataSource, NotaEntity, NotaRepository } from "../../domain";

export class NotaRepositoryImpl implements NotaRepository {
    constructor(
        private readonly datasource: NotaDataSource,
    ) {}
    create(createNotaDto: CreateNotaDto): Promise<NotaEntity> {
        return this.datasource.create(createNotaDto);
    }
    getAll(): Promise<NotaEntity[]> {
        return this.datasource.getAll();
    }
    deleteById(id: number): Promise<NotaEntity> {
        return this.datasource.deleteById(id);
    }
}
