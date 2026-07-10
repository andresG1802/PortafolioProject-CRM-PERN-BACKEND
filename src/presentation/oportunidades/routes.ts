import { Router } from "express";
import { OportunidadDatasourceImpl } from "../../infrastructure/datasource/oportunidad.datasource.impl";
import { OportunidadRepositoryImpl } from "../../infrastructure/repositories/oportunidad.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { OportunidadesController } from "./controller";

export class OportunidadRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new OportunidadDatasourceImpl();
        const oportunidadRepository = new OportunidadRepositoryImpl(datasource);
        const controller = new OportunidadesController(oportunidadRepository);

        router.use(AuthMiddleware.validateJWT);

        router.get('/', controller.getOportunidades);
        router.get('/:id', controller.getOportunidadById);
        router.post('/', controller.createOportunidad);
        router.put('/:id', controller.updateOportunidad);
        router.delete('/:id', AuthMiddleware.checkRole('ADMIN'), controller.deleteOportunidad);

        return router;
    }
}
