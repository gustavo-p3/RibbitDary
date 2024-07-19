import { Request, Response} from "express";
import pool from '../database'


class ProyectsController{
    public async list(req : Request, resp : Response){
        const proyect = await pool.query('SELECT * FROM proyecto');
        resp.json(proyect);
        
    }
    public async listU(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const proyectos = await pool.query(`
                SELECT proyecto.* 
                FROM proyecto 
                WHERE proyecto.idU = ?
    
                UNION
    
                SELECT proyecto.* 
                FROM proyecto 
                INNER JOIN proyectxcolab 
                ON proyecto.idP = proyectxcolab.idP 
                WHERE proyectxcolab.idColaboradores = ?`, [idU, idU]);
            
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

    public async delete(req : Request, resp : Response){
        const {idP} = req.params;
        try {
            // Borrar todas las filas en proyectxcolab donde idP sea igual a idP
            await pool.query('DELETE FROM proyectxcolab WHERE idP = ?', [idP]);

            // Borrar el proyecto en la tabla proyecto
            await pool.query('DELETE FROM tarea WHERE idP = ?', [idP]);
      
            // Borrar el proyecto en la tabla proyecto
            await pool.query('DELETE FROM proyecto WHERE idP = ?', [idP]);
      
            resp.json({ message: 'Proyect deleted' });
          } catch (error) {
            console.error('Error al borrar proyecto:', error);
            resp.status(500).json({ message: 'Error al borrar proyecto' });
          }
        
    }

    public async update(req : Request, resp : Response){
        const {idP} = req.params;
        await pool.query('UPDATE proyecto SET? WHERE idP =?', [req.body, idP]);
        resp.json({message:'Updating a proyects ' + req.params.id});
    }

}

export const proyectsController = new ProyectsController();
