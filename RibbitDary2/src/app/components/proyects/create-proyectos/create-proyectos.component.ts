import { Component } from '@angular/core';
import { Proyect } from '../../../models/Proyect';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-create-proyectos',
  templateUrl: './create-proyectos.component.html',
  styleUrls: ['./create-proyectos.component.css']
})
export class CreateProyectosComponent {
  proyect: Proyect = {
    nameProyect: '',
    idType: '',
    idU: '',
    fechaI: '',
    fechaF: '',
    descripcion: '',
    notas: '',
  };
  edit : boolean = false;
  constructor(private proyectsService: ProyectsService, 
              private router : Router,
              private route: ActivatedRoute,
              private activatedRoute : ActivatedRoute
            ) { }

  ngOnit(){
    const params = this.activatedRoute.snapshot.params;

      if((params)['idP']){
          this.proyectsService.getProyect((params)['idP']).subscribe(
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
        resp => { console.log('Proyecto guardado:', resp); },
        err => console.error('Error al guardar proyecto:', err)
      );
      delete this.proyect.idP;
    }
  }
  
  updateProyect(){
    let number : number = Number(this.proyect.idP);

    this.proyectsService.updateProyect(number, this.proyect).subscribe(

        resp=>{console.log(resp);
          this.router.navigate(['/proyects'])
        },
        err=>console.log(err)
    );
  }

}
