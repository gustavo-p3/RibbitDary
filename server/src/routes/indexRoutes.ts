import {Router} from 'express';
import { indexController } from '../controllers/indexController';

class IndexRoutes{
    public router: Router = Router();
    constructor() {
    this.config();
    }

    config():void{
    this.router.get('/', indexController.index); 
    //Creando una ruta para mi aplicación del servidor para la 
    //ruta inicial y se devuelve el mensaje Hello

    }
}

const indexRoutes = new IndexRoutes;
export default indexRoutes.router;
