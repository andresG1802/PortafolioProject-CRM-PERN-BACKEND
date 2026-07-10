import { CreateTareaDto, TareaDataSource, TareaEntity, TareaRepository, UpdateTareaDto } from "../../domain";

export class TareaRepositoryImpl implements TareaRepository {
    constructor(
        private readonly datasource: TareaDataSource,
    ) {}
    create(createTareaDto: CreateTareaDto): Promise<TareaEntity> {
        return this.datasource.create(createTareaDto);
    }
    getAll(): Promise<TareaEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TareaEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateTareaDto: UpdateTareaDto): Promise<TareaEntity> {
        return this.datasource.updateById(updateTareaDto);
    }
    deleteById(id: number): Promise<TareaEntity> {
        return this.datasource.deleteById(id);
    }
}
