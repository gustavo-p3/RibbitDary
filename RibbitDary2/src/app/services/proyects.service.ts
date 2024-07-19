import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyect, Tarea } from '../models/Proyect';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private API_BASE_URL = 'http://localhost:3000/api';
  proyect_created_at: any;

  constructor(private http: HttpClient) {}

  // Proyectos
  getProyects(): Observable<Proyect[]> {
    return this.http.get<Proyect[]>(`${this.API_BASE_URL}/proyects`);
  }

  getProyect(idU: string): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.API_BASE_URL}/proyects/${idU}`);
  }

  getProyectT(idU: string, idP: string): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.API_BASE_URL}/proyects/${idU}/${idP}`);
  }

  saveProyect(proyect: Proyect): Observable<Proyect> {
    return this.http.post<Proyect>(`${this.API_BASE_URL}/proyects`, proyect);
  }

  deleteProyect(idP : string): Observable<Proyect>{
    return this.http.delete<Proyect>(`${this.API_BASE_URL}/proyects/${idP}`);
  }

  updateProyect(idP:string | number, updateProyect:Proyect): Observable<Proyect> {

    return this.http.put<Proyect>(`${this.API_BASE_URL}/proyects/${idP}`, this.updateProyect);
    
  }

  // Tareas
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.API_BASE_URL}/tareas`);
  }

  getTarea(idU: string, idP: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/tareas/${idU}/${idP}`);
  }

  saveTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.API_BASE_URL}/tareas`, tarea);
  }
  
}
