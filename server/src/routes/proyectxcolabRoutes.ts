import {Router} from 'express';
import { proyectxcolabController } from '../controllers/proyectxcolabController';

class ProyectxcolabRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/', proyectxcolabController.list); 
        this.router.get('/:idP', proyectxcolabController.listUP); 
    //Creando una ruta para mi aplicación del servidor para la 
    //ruta inicial y se devuelve el mensaje Hello
       this.router.get('/:idU/:idP', proyectxcolabController.getOne);
    }
}

const proyectxcolabRoutes = new ProyectxcolabRoutes;
export default proyectxcolabRoutes.router;
