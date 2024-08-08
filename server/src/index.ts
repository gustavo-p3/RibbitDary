import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import proyectsRoutes from './routes/proyectsRoutes';
import tareasRoutes from './routes/tareasRoutes';
import morgan from 'morgan';
import cors from 'cors';
import proyectxcolabRoutes from './routes/proyectxcolabRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import userxuserRoutes from './routes/userxuserRoutes';
import materialesRoutes from './routes/materialesRoutes';
import authRoutes from './routes/authRoutes';
import tipoProyectoRoutes from './routes/tipoProyectRoutes';
import progresoRoutes from './routes/progresoRoutes';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/proyects', proyectsRoutes);
        this.app.use('/api/tareas', tareasRoutes);
        this.app.use('/api/proyectxcolab', proyectxcolabRoutes);
        this.app.use('/api/userxuser', userxuserRoutes);
        this.app.use('/api/usuario', usuarioRoutes);
        this.app.use('/api/materiales', materialesRoutes);
        this.app.use('/api/tipoproyecto', tipoProyectoRoutes);
        this.app.use('/api', authRoutes); 
        this.app.use('/api/progreso', progresoRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
