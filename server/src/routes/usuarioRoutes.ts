import {Router} from 'express';
import { usuarioController } from '../controllers/usuarioController';

class UsuarioRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/', usuarioController.list); 
        this.router.get('/:idU', usuarioController.getOne); 
        this.router.post('/', usuarioController.create);   
    }
}

const usuarioRoutes = new UsuarioRoutes;
export default usuarioRoutes.router;
