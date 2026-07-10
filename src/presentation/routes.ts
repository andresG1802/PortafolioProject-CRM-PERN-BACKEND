import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ClienteRoutes } from "./clientes/routes";
import { ContactoRoutes } from "./contactos/routes";
import { OportunidadRoutes } from "./oportunidades/routes";
import { TareaRoutes } from "./tareas/routes";
import { NotaRoutes } from "./notas/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/clientes', ClienteRoutes.routes);
        router.use('/api/contactos', ContactoRoutes.routes);
        router.use('/api/oportunidades', OportunidadRoutes.routes);
        router.use('/api/tareas', TareaRoutes.routes);
        router.use('/api/notas', NotaRoutes.routes);

        return router;
    }
}
