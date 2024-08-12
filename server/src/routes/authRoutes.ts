import { Router } from 'express';
import { authController } from '../controllers/authController';

class AuthRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', authController.login); // Asegúrate de que el controlador esté correctamente asignado
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
