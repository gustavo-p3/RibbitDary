"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tareasController = void 0;
const database_1 = __importDefault(require("../database"));
class TareasController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const proyect = yield database_1.default.query('SELECT * FROM tarea');
            resp.json(proyect);
        });
    }
    listP(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU, idP } = req.params;
            try {
                const tareas = yield database_1.default.query(`
                SELECT *
                FROM tarea
                WHERE idP = ? AND (idU = ? OR idColaboradores = ?)
            `, [idP, idU, idU]);
                resp.json(tareas);
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving tasks' });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO tarea SET ?', [req.body]);
            resp.json({ message: 'Proyect Saved' });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idT } = req.params;
            yield database_1.default.query('DELETE FROM tarea WHERE idT =?', [idT]);
            resp.json({ message: 'Proyect deleted' });
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idT } = req.params;
            yield database_1.default.query('UPDATE tarea SET? WHERE idT =?', [req.body, idT]);
            resp.json({ message: 'Updating a proyects ' + req.params.id });
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idT } = req.params;
            const proyects = yield database_1.default.query('SELECT * FROM tarea WHERE idT = ?', [idT]);
            if (proyects.length > 0) {
                resp.json(proyects[0]);
            }
            else {
                resp.status(404).json({ message: 'Proyect not found' });
            }
        });
    }
}
exports.tareasController = new TareasController();