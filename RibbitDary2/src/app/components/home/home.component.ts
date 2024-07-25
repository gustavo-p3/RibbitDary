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
  tareas: any = [];
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
      this.proyectsService.getTareas(this.idU).subscribe(
        resp => {
          this.tareas = resp;
          this.tareas.forEach((tarea: any) => {
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
