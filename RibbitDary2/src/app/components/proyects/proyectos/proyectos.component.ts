import { Component, HostBinding, OnInit } from '@angular/core';
import { ProyectsService } from '../../../services/proyects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  proyects: any = [];
  idU: string | null = null;
  creadorProyect: any = {};
  user: any = [];
  tipoProyecto: any = [];
  searchTerm: string = '';

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    // Obtener proyectos al iniciar la página
    this.getUser();
    this.getProyects();
  }

  deleteProyect(idP: string) {
    console.log(idP);

    this.proyectsService.deleteProyect(idP).subscribe(
      resp => {
        console.log(resp);
        this.getProyects();
      },
      err => console.error(err)
    );
  }

  getProyects() {
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idU) {
      this.proyectsService.getProyect(this.idU).subscribe(
        resp => {
          this.proyects = resp;
          this.proyects.forEach((proyect: any) => {
            this.getCreador(proyect.idU);
            this.getTipoProyecto(proyect.idType);
          });
        },
        err => console.error('Error al obtener proyectos:', err)
      );
    }
  }

  getCreador(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.creadorProyect = resp;
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }

  getUser() {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU) {
      this.proyectsService.getUsuario(idU).subscribe(
        resp => {
          this.user = resp;
        },
        err => console.error('Error al obtener usuario:', err)
      );
    }
  }
  getTipoProyecto(idType : string) {
      this.proyectsService.getTipoproyecto(idType).subscribe(
        resp => {
          this.tipoProyecto = resp;
        },
        err => console.error('Error al obtener usuario:', err)
      );
  }
//Buscar Proyecto
  buscarProyecto() {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU && this.searchTerm.trim()) { // Verifica que searchTerm no esté vacío
      this.proyectsService.buscarProyect(idU, this.searchTerm).subscribe(
        resp => {
          this.proyects = resp;
          this.proyects.forEach((proyect: any) => {
            this.getCreador(proyect.idU);
          });
        },
        error => {
          console.error('Error en la búsqueda:', error);
        }
      );
    } else {
      // Si searchTerm está vacío, vuelve a cargar todos los proyectos
      this.getProyects();
    }
  }

  
}
