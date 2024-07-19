import { Request, Response} from "express";
import pool from '../database'


class ProyectxcolabController{
    public async list(req : Request, resp : Response){
        const proyectxcolab = await pool.query('SELECT * FROM proyectxcolab');
        resp.json(proyectxcolab);
        
    }
    public async listUP(req: Request, resp: Response) {
        const { idP } = req.params;
        try {
            const proyectos = await pool.query(`
                SELECT proyectxcolab.* 
                FROM proyectxcolab 
                WHERE proyectxcolab.idP = ?
                `, [idP]);
            
            resp.json(proyectos);
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving projects' });
        }
    }   

    public async getOne(req: Request, resp: Response) {
        const { idU, idP } = req.params;
    
        try {
            const query = `
                SELECT proyecto.*
                FROM proyecto
                LEFT JOIN proyectxcolab ON proyecto.idP = proyectxcolab.idP
                WHERE (proyecto.idP = ? AND proyecto.idU = ?) OR (proyecto.idP = ? AND proyectxcolab.idColaboradores = ?)
            `;
    
            const result = await pool.query(query, [idP, idU, idP, idU]);
    
            if (result.length > 0) {
                resp.json(result[0]);
            } else {
                resp.status(404).json({ message: 'Proyecto no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            resp.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    
    

    public async create(req : Request, resp : Response): Promise<void>{
        console.log(req.body);
       await pool.query('INSERT INTO proyecto SET ?', [req.body]);
        resp.json({message : 'Proyect Saved'});
    }

}

export const proyectxcolabController = new ProyectxcolabController();
