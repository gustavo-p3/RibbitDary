import { Request, Response } from "express";
import pool from "../database";
import bcrypt from 'bcryptjs';

class UsuarioController{
    public async list(req : Request, resp : Response){
        const usuario = await pool.query('SELECT * FROM usuario');
        resp.json(usuario);
        
    }
    public async getOne(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const usuario = await pool.query(`
                SELECT usuario.* 
                FROM usuario 
                WHERE usuario.idU = ?
                `, [idU]);
            
            resp.json(usuario);
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving usuario' });
        }
    }  
    
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
