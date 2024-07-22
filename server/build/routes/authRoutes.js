"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/login', authController_1.authController.login); // Asegúrate de que el controlador esté correctamente asignado
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
