import { Router } from "express";
import { usuarioController } from "../controllers/usuarioContoller";

class UsuarioRoutes {
public router:Router = Router();
constructor () {this.config();}

config():void {
 this.router.post('/', usuarioController.create);   
} ;

}



const usuarioRoutes =new UsuarioRoutes;
export default usuarioRoutes.router;