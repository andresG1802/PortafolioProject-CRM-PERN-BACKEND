import { Router } from "express";
import { NotaDatasourceImpl } from "../../infrastructure/datasource/nota.datasource.impl";
import { NotaRepositoryImpl } from "../../infrastructure/repositories/nota.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { NotasController } from "./controller";

export class NotaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new NotaDatasourceImpl();
        const notaRepository = new NotaRepositoryImpl(datasource);
        const controller = new NotasController(notaRepository);

        router.use(AuthMiddleware.validateJWT);

        router.get('/', controller.getNotas);
        router.post('/', controller.createNota);
        router.delete('/:id', controller.deleteNota);

        return router;
    }
}
