import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyect, Tarea, Proyectxcolab, Material } from '../models/Proyect';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  getAgregarP(idU: any) {
    throw new Error('Method not implemented.');
  }
  private API_BASE_URL = 'http://localhost:3000/api';
  private loginUrl = 'http://localhost:3000/api/login';
  proyect_created_at: any;

  constructor(private http: HttpClient) { }

  //Usuarios
  getUsuario(idU: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_BASE_URL}/usuario/${idU}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }

  //User x User
  getUserxUser(idU: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_BASE_URL}/userxuser/${idU}`);
  }
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

  deleteProyect(idP: string): Observable<Proyect> {
    return this.http.delete<Proyect>(`${this.API_BASE_URL}/proyects/${idP}`);
  }

  updateProyect(idP: number, updatedProyect: Proyect): Observable<Proyect> {
    return this.http.put<Proyect>(`${this.API_BASE_URL}/proyects/${idP}`, updatedProyect);
  }

  // Colaboradores
  getColaboradores(idP: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_BASE_URL}/proyectxcolab/${idP}`);
  }

  savePColaboradores(proyectxcolab: Proyectxcolab): Observable<Proyectxcolab> {
    return this.http.post<Proyectxcolab>(`${this.API_BASE_URL}/proyectxcolab`, proyectxcolab);
  }

  deletePColaborador(idP: string, idC: string): Observable<Proyectxcolab> {
    return this.http.delete<Proyectxcolab>(`${this.API_BASE_URL}/proyectxcolab/${idP}/${idC}`);
  }

  // Tareas
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.API_BASE_URL}/tareas`);
  }

  getTareaP(idU: string, idP: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/tareas/${idU}/${idP}`);
  }

  getTarea(idU: string, idP: string, idT: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/tareas/${idU}/${idP}/${idT}`);
  }

  saveTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.API_BASE_URL}/tareas`, tarea);
  }

  deleteTarea(idT: string): Observable<Tarea> {
    return this.http.delete<Tarea>(`${this.API_BASE_URL}/tareas/${idT}`);
  }

  updateTarea(idT: number, updatedTarea: Tarea): Observable<Proyect> {
    return this.http.put<Proyect>(`${this.API_BASE_URL}/tareas/${idT}`, updatedTarea);
  }



  //Materiales
  getMaterialesTarea(idT: string): Observable<Material> {
    return this.http.get<Material>(`${this.API_BASE_URL}/materiales/${idT}`);
  }
  
  saveMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.API_BASE_URL}/materiales`, material);
  }

  deleteMaterial(idMt: string): Observable<Material> {
    return this.http.delete<Tarea>(`${this.API_BASE_URL}/materiales/${idMt}`);
  }

}
