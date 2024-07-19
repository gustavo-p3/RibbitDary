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
  proyects : any = []; 

  idP: string | null = null;
  idU: string | null = null;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  this.idP = this.route.snapshot.paramMap.get('idP');
  this.idU = this.route.snapshot.paramMap.get('idU'); 
  

    if (this.idP && this.idU) {

      this.proyectsService.getProyectT(this.idU, this.idP).subscribe(
        resp => {
          this.proyects = resp;
        },
        err => console.error('Error al obtener proyectos:', err)
      );

      this.proyectsService.getTarea(this.idU, this.idP).subscribe(
        resp => {
          this.tareas = resp;
        },
        err => console.error('Error al obtener tareas:', err)
      );
    } else {
      console.error('No se pudo obtener el idP de la ruta.');
    }
  }
}


  /*tareas: Tarea[] = [];
  filteredTareas: Tarea[] = [];

  proyects : any = []; 
  filtereProyects: Proyect[] = [];

  idP: string | null = null; // Variable para almacenar el idP obtenido de la ruta

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idP = this.route.snapshot.paramMap.get('idP'); // Obtener idP de la ruta
  
    if (this.idP) {
      this.proyectsService.getProyect(this.idP).subscribe(
        resp => {
          this.proyects = resp;
        },
        err => console.error('Error al obtener proyectos:', err)
      );
  
      this.proyectsService.getTareas().subscribe(
        resp => {
          this.tareas = resp;
          this.filteredTareas = this.tareas.filter(tarea => tarea.idP === this.idP);
        },
        err => console.error('Error al obtener tareas:', err)
      );
    }
  }
    */