import { Component, HostBinding, OnInit } from '@angular/core';
import { ProyectsService } from '../../../services/proyects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']  // Corregido de styleUrl a styleUrls
})
export class ProyectosComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  proyects: any = []; // Tipado adecuado para el arreglo de proyectos
  idU: string | null = null;
  creadorProyect: any = {};
  user: any = [];

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.getProyects(); // Obtener proyectos al iniciar la página
    this.getUser(); 

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

}