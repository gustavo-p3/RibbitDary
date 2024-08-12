import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Proyect';


@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  getAgregarP(idU: any) {
    throw new Error('Method not implemented.');
  }
  private API_BASE_URL = 'http://localhost:3000/api';
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  //Usuarios
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }
   
  crearUsuario(usuario:Usuario):Observable <Usuario> {
  return this.http.post<Usuario>(`${this.API_BASE_URL}/usuario`,usuario);
}

}
