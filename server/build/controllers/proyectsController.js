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
exports.proyectsController = void 0;
const database_1 = __importDefault(require("../database"));
class ProyectsController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const proyect = yield database_1.default.query('SELECT * FROM proyecto');
            resp.json(proyect);
        });
    }
    listU(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const proyectos = yield database_1.default.query(`
                SELECT proyecto.* 
                FROM proyecto 
                WHERE proyecto.idU = ?
    
                UNION
    
                SELECT proyecto.* 
                FROM proyecto 
                INNER JOIN proyectxcolab 
                ON proyecto.idP = proyectxcolab.idP 
                WHERE proyectxcolab.idColaborador = ?`, [idU, idU]);
                resp.json(proyectos);
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving projects' });
            }
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU, idP } = req.params;
            try {
                const query = `
                SELECT proyecto.*
                FROM proyecto
                LEFT JOIN proyectxcolab ON proyecto.idP = proyectxcolab.idP
                WHERE (proyecto.idP = ? AND proyecto.idU = ?) OR (proyecto.idP = ? AND proyectxcolab.idColaborador = ?)
            `;
                const result = yield database_1.default.query(query, [idP, idU, idP, idU]);
                if (result.length > 0) {
                    resp.json(result[0]);
                }
                else {
                    resp.status(404).json({ message: 'Proyecto no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al obtener proyecto:', error);
                resp.status(500).json({ message: 'Error interno del servidor' });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const result = yield database_1.default.query('INSERT INTO proyecto SET ?', [req.body]);
            const idP = result.insertId; // Obtener el ID del proyecto recién creado
            resp.json({ message: 'Proyect Saved', idP: idP }); // Devolver el ID del proyecto
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idP } = req.params;
            try {
                // Borrar todas las filas en proyectxcolab donde idP sea igual a idP
                yield database_1.default.query('DELETE FROM proyectxcolab WHERE idP = ?', [idP]);
                yield database_1.default.query('DELETE FROM material WHERE idP = ?', [idP]);
                // Borrar el proyecto en la tabla proyecto
                yield database_1.default.query('DELETE FROM tarea WHERE idP = ?', [idP]);
                // Borrar el proyecto en la tabla proyecto
                yield database_1.default.query('DELETE FROM proyecto WHERE idP = ?', [idP]);
                resp.json({ message: 'Proyect deleted' });
            }
            catch (error) {
                console.error('Error al borrar proyecto:', error);
                resp.status(500).json({ message: 'Error al borrar proyecto' });
            }
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idP } = req.params;
            yield database_1.default.query('UPDATE proyecto SET ? WHERE idP =?', [req.body, idP]);
            resp.json({ message: 'Updating a proyects ' + req.params.id });
        });
    }
}
exports.proyectsController = new ProyectsController();
