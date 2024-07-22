import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  tareas: any = [];
  proyects: any = [];
  colaboradores: any = [];
  materiales: any = {};
  colaboradorTareas: any = {};

  idP: string | null = null;
  idU: string | null = null;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idP = this.route.snapshot.paramMap.get('idP');
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idP && this.idU) {
      this.getColaboradores(this.idP);
      this.getTareas();
      this.getProyectT(this.idU, this.idP);
    } else {
      console.error('No se pudo obtener el idP o idU de la ruta.');
    }
  }

  getColaboradores(idP: string) {
    this.proyectsService.getColaboradores(idP).subscribe(
      resp => {
        this.colaboradores = resp;
      },
      err => console.error('Error al obtener colaboradores:', err)
    );
  }

  getTareas() {
    this.idP = this.route.snapshot.paramMap.get('idP');
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idP && this.idU) {
      this.proyectsService.getTarea(this.idU, this.idP).subscribe(
        resp => {
          this.tareas = resp;
          this.tareas.forEach((tarea: any) => {
            this.getMateriales(tarea.idT);
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );
    } else {
      console.error('No se pudo obtener el idP o idU de la ruta.');
    }
  }

  getProyectT(idU: string, idP: string) {
    this.proyectsService.getProyectT(idU, idP).subscribe(
      resp => {
        this.proyects = resp;
      },
      err => console.error('Error al obtener proyectos:', err)
    );
  }

  getMateriales(idT: string) {
    this.proyectsService.getMaterialesTarea(idT).subscribe(
      resp => {
        this.materiales[idT] = resp;  // Almacenar materiales en un objeto usando idT como clave
      },
      err => console.error('Error al obtener materiales:', err)
    );
  }

  getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.colaboradorTareas[idU] = resp;  // Almacenar datos de usuario en un objeto usando idU como clave
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }

  deleteTarea(idT: string) {
    console.log(idT);

    this.proyectsService.deleteTarea(idT).subscribe(
      resp => {
        console.log(resp);
        this.getTareas();
      },
      err => console.error(err)
    );
  }
}
