import { Request, Response } from "express";
import pool from "../database";
import bcrypt from 'bcryptjs';


class UsuarioController {
    public async create(req: Request, resp: Response) {
        try {
          const { password, ...userData } = req.body;
          if (!password) {
            return resp.status(400).json({ message: 'Password is required' });
          }
    
          // Hashear la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Guardar el usuario con la contraseña hasheada
          await pool.query(
            'INSERT INTO usuario SET ?', 
            [{ ...userData, password: hashedPassword }]
          );
    
          resp.json({ message: 'Usuario guardado' });
        } catch (error) {
          console.error('Error al guardar el usuario', error);
          resp.status(500).json({ message: 'Error al guardar el usuario' });
        }
      }
}

export const usuarioController = new UsuarioController();