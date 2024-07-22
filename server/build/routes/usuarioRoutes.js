"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioController_1.usuarioController.list);
        this.router.get('/:idU', usuarioController_1.usuarioController.getOne);
    }
}
const usuarioRoutes = new UsuarioRoutes;
exports.default = usuarioRoutes.router;
