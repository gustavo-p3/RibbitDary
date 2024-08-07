import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../services/proyects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {

 @HostBinding('class') classes = 'row';

  tareasUrgentes: any = [];
  tareasMedias: any = [];
  tareasNoUrgentes: any = [];
  tareasVencidas: any = [];
  materiales: any = {};
  colaboradorTareas: any = {};
  user: any = [];

  idP: string | null = null;
  idU: string | null = null;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idU) {
      this.getTareas();
      this.getUser(this.idU);
    } else {
      console.error('No se pudo obtener el idP o idU de la ruta.');
    }
  }


  getUser(idU : string){
    if (idU) {
      this.proyectsService.getUsuario(idU).subscribe(
        resp => {
          this.user = resp;
        },
        err => console.error('Error al obtener usuario:', err)
      );
    }
  }

  getTareas() {
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idU) {
      //Solo Tareas Urgentes
      this.proyectsService.getTareasUrgentes(this.idU).subscribe(
        resp => {
          this.tareasUrgentes = resp;
          this.tareasUrgentes.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );

      //Solo Tareas Medias
      this.proyectsService.getTareasMedias(this.idU).subscribe(
        resp => {
          this.tareasMedias = resp;
          this.tareasMedias.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );
      //Solo Tareas Urgentes
      this.proyectsService.getTareasNoUrgentes(this.idU).subscribe(
        resp => {
          this.tareasNoUrgentes = resp;
          this.tareasNoUrgentes.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );
      //Solo Tareas Vencidas
      this.proyectsService.getTareasVencidas(this.idU).subscribe(
        resp => {
          this.tareasVencidas = resp;
          this.tareasVencidas.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );




    } else {
      console.error('No se pudo obtener el idP o idU de la ruta.');
    }
  }


  getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.colaboradorTareas[idU] = resp;  // Almacenar datos de usuario en un objeto usando idU como clave
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }


}
