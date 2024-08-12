"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioContoller_1 = require("../controllers/usuarioContoller");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', usuarioContoller_1.usuarioController.create);
    }
    ;
}
const usuarioRoutes = new UsuarioRoutes;
exports.default = usuarioRoutes.router;
