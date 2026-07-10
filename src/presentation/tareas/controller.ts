import { Request, Response } from "express";
import {
    CreateTarea,
    CreateTareaDto,
    CustomError,
    DeleteTarea,
    GetTarea,
    GetTareas,
    TareaRepository,
    UpdateTarea,
    UpdateTareaDto,
} from "../../domain";

export class TareasController {
    constructor(
        private readonly tareaRepository: TareaRepository,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    public getTareas = (req: Request, res: Response) => {
        new GetTareas(this.tareaRepository)
            .execute()
            .then(tareas => res.json(tareas))
            .catch(error => this.handleError(error, res));
    };

    public getTareaById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetTarea(this.tareaRepository)
            .execute(id)
            .then(tarea => res.json(tarea))
            .catch(error => this.handleError(error, res));
    };

    public createTarea = (req: Request, res: Response) => {
        const [error, createTareaDto] = CreateTareaDto.create({ ...req.body, userId: req.body.user.id });
        if (error) return res.status(400).json({ error });

        new CreateTarea(this.tareaRepository)
            .execute(createTareaDto!)
            .then(tarea => res.status(201).json(tarea))
            .catch(error => this.handleError(error, res));
    };

    public updateTarea = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTareaDto] = UpdateTareaDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        new UpdateTarea(this.tareaRepository)
            .execute(updateTareaDto!)
            .then(tarea => res.json(tarea))
            .catch(error => this.handleError(error, res));
    };

    public deleteTarea = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteTarea(this.tareaRepository)
            .execute(id)
            .then(tarea => res.json(tarea))
            .catch(error => this.handleError(error, res));
    };
}
