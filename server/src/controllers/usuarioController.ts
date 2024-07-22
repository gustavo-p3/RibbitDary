import { Request, Response} from "express";
import pool from '../database'


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
}

export const usuarioController = new UsuarioController();
