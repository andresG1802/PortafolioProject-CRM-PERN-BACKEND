import { Router } from "express";
import { TareaDatasourceImpl } from "../../infrastructure/datasource/tarea.datasource.impl";
import { TareaRepositoryImpl } from "../../infrastructure/repositories/tarea.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { TareasController } from "./controller";

export class TareaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TareaDatasourceImpl();
        const tareaRepository = new TareaRepositoryImpl(datasource);
        const controller = new TareasController(tareaRepository);

        router.use(AuthMiddleware.validateJWT);

        router.get('/', controller.getTareas);
        router.get('/:id', controller.getTareaById);
        router.post('/', controller.createTarea);
        router.put('/:id', controller.updateTarea);
        router.delete('/:id', AuthMiddleware.checkRole('ADMIN'), controller.deleteTarea);

        return router;
    }
}
