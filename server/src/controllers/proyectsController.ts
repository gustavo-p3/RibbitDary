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
                WHERE proyectxcolab.idColaborador = ?`, [idU, idU]);
            
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
                WHERE (proyecto.idP = ? AND proyecto.idU = ?) OR (proyecto.idP = ? AND proyectxcolab.idColaborador = ?)
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
    
    

    public async create(req: Request, resp: Response): Promise<void> {
        console.log(req.body);
        const result = await pool.query('INSERT INTO proyecto SET ?', [req.body]);
        const idP = result.insertId; // Obtener el ID del proyecto recién creado
        resp.json({ message: 'Proyect Saved', idP: idP }); // Devolver el ID del proyecto
    }
    

    public async delete(req : Request, resp : Response){
        const {idP} = req.params;
        try {
            // Borrar todas las filas en proyectxcolab donde idP sea igual a idP
            await pool.query('DELETE FROM proyectxcolab WHERE idP = ?', [idP]);

            await pool.query('DELETE FROM material WHERE idP = ?', [idP]);

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
        await pool.query('UPDATE proyecto SET ? WHERE idP =?', [req.body, idP]);
        resp.json({message:'Updating a proyects ' + req.params.id});
    }

    public async buscarProyecto(req: Request, resp: Response): Promise<void> {
        const { idU } = req.params;  // idU es el primer parámetro
        const { b } = req.params;    // b es el segundo parámetro
    
        try {
            // Buscar proyectos del usuario y los proyectos donde el usuario es colaborador
            const proyectos = await pool.query(`
                SELECT proyecto.* 
                FROM proyecto 
                WHERE proyecto.idU = ? AND proyecto.nameProyect LIKE ?
        
                UNION
        
                SELECT proyecto.* 
                FROM proyecto 
                INNER JOIN proyectxcolab 
                ON proyecto.idP = proyectxcolab.idP 
                WHERE proyectxcolab.idColaborador = ? AND proyecto.nameProyect LIKE ?`, [idU, `%${b}%`, idU, `%${b}%`]);
            
            console.log('Proyectos encontrados:', proyectos); // Log para depuración
            resp.json(proyectos);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            resp.status(500).json({ message: 'Error en el servidor' });
        }
    }    

}

export const proyectsController = new ProyectsController();
