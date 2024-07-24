"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const proyectsRoutes_1 = __importDefault(require("./routes/proyectsRoutes"));
const tareasRoutes_1 = __importDefault(require("./routes/tareasRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const proyectxcolabRoutes_1 = __importDefault(require("./routes/proyectxcolabRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const userxuserRoutes_1 = __importDefault(require("./routes/userxuserRoutes"));
const materialesRoutes_1 = __importDefault(require("./routes/materialesRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const tipoProyectRoutes_1 = __importDefault(require("./routes/tipoProyectRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/proyects', proyectsRoutes_1.default);
        this.app.use('/api/tareas', tareasRoutes_1.default);
        this.app.use('/api/proyectxcolab', proyectxcolabRoutes_1.default);
        this.app.use('/api/userxuser', userxuserRoutes_1.default);
        this.app.use('/api/usuario', usuarioRoutes_1.default);
        this.app.use('/api/materiales', materialesRoutes_1.default);
        this.app.use('/api/tipoproyecto', tipoProyectRoutes_1.default);
        this.app.use('/api', authRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
