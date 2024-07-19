import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../../models/Proyect';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-create-proyectos',
  templateUrl: './create-proyectos.component.html',
  styleUrls: ['./create-proyectos.component.css']
})
export class CreateProyectosComponent implements OnInit {
  proyect: Proyect = {
    nameProyect: '',
    idType: '',
    idU: '',
    fechaI: '',
    fechaF: '',
    descripcion: '',
    notas: '',
  };
  idP: string | null = null;
  idU: string | null = null;
  edit: boolean = false;

  constructor(
    private proyectsService: ProyectsService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idU = this.route.snapshot.paramMap.get('idU');
    this.idP = this.route.snapshot.paramMap.get('idP');

    if (this.idP && this.idU) {
      this.proyectsService.getProyectT(this.idU, this.idP).subscribe(
        resp => {
          console.log(resp);
          this.proyect = resp;
          this.edit = true;
        },
        err => console.log(err)
      );
    }
  }

  saveNewProyect() {
    const idU = this.route.snapshot.paramMap.get('idU');

    if (idU) {
      this.proyect.idU = idU;
      this.proyectsService.saveProyect(this.proyect).subscribe(
        resp => { 
          console.log('Proyecto guardado:', resp); 
          this.router.navigate(['/proyects']);
        },
        err => console.error('Error al guardar proyecto:', err)
      );
    }
  }

  updateProyect() {
    if (this.proyect.idP) {
      const number: number = Number(this.proyect.idP);

      this.proyectsService.updateProyect(number, this.proyect).subscribe(
        resp => {
          console.log(resp);
          this.router.navigate(['/proyects']);
        },
        err => console.log(err)
      );
    }
  }
}
