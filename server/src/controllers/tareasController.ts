import { Request, Response} from "express";
import pool from '../database'


class TareasController{
    public async list(req : Request, resp : Response){
        const proyect = await pool.query('SELECT * FROM tarea');
        resp.json(proyect);
        
    }

    public async listP(req: Request, resp: Response) {
        const { idU, idP } = req.params;
    
        try {
            const tareas = await pool.query(`
                SELECT *
                FROM tarea
                WHERE idP = ? AND (idU = ? OR idColaboradores = ?)
            `, [idP, idU, idU]);
    
            resp.json(tareas);
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving tasks' });
        }
    }
    

    public async create(req : Request, resp : Response): Promise<void>{
        console.log(req.body);
       await pool.query('INSERT INTO tarea SET ?', [req.body]);
        resp.json({message : 'Proyect Saved'});
    }

    public async delete(req : Request, resp : Response){
        const {idT} = req.params;
        await pool.query('DELETE FROM tarea WHERE idT =?', [idT]);
        resp.json({message : 'Proyect deleted'});
    }

    public async update(req : Request, resp : Response){
        const {idT} = req.params;
        await pool.query('UPDATE tarea SET? WHERE idT =?', [req.body, idT]);
        resp.json({message:'Updating a proyects ' + req.params.id});
    }

    public async getOne(req : Request, resp : Response){
        const {idT} = req.params;
        const proyects = await pool.query('SELECT * FROM tarea WHERE idT = ?', [idT]);

        if(proyects.length > 0){
            resp.json(proyects[0]);
        }else{
            resp.status(404).json({message:'Proyect not found'});
        }
    }
}

export const tareasController = new TareasController();
