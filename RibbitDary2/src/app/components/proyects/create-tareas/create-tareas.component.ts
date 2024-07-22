import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarea, Material } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.component.html',
  styleUrls: ['./create-tareas.component.css']
})
export class CreateTareasComponent implements OnInit {
  tarea: Tarea = {
    idP: '',
    nomTarea: '',
    fechaI: '',
    descripcion: '',
    fechaF: '',
    idColaborador: 'opcion1',
  };

  newMaterial: string = '';
  materiales: Material[] = [];

  proyects: any = [];
  colaboradores: any = [];

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idP = this.route.snapshot.paramMap.get('idP');
    if (idP) {
      this.proyectsService.getProyect(idP).subscribe(
        resp => {
          this.proyects = resp;
        },
        err => console.error('Error al obtener proyectos:', err)
      );

      this.proyectsService.getColaboradores(idP).subscribe(
        resp => {
          this.colaboradores = resp;
        },
        err => console.error('Error al obtener colaboradores:', err)
      );
    }
  }

  addMaterial() {
    if (this.newMaterial) {
      this.materiales.push({ nombreMaterial: this.newMaterial, idT: '' });
      this.newMaterial = '';
    }
  }

  removeMaterial(material: Material) {
    const index = this.materiales.indexOf(material);
    if (index > -1) {
      this.materiales.splice(index, 1);
    }
  }

  async saveNewTarea() {
    const idU = this.route.snapshot.paramMap.get('idU');
    const idP = this.route.snapshot.paramMap.get('idP');

    if (idU && idP) {
      this.tarea.idU = idU;
      this.tarea.idP = idP;
      try {
        const resp = await this.proyectsService.saveTarea(this.tarea).toPromise();
        console.log('Tarea guardada:', resp);

        if (resp && resp.idT) {
          const idT = resp.idT.toString();
          this.saveNewMaterials(idT, idP);
        }
      } catch (err) {
        console.error('Error al guardar tarea:', err);
      }
    }
  }

  saveNewMaterials(idT: string, idP: string ){

    this.materiales.forEach(material => {
      material.idT = idT;
      material.idP = idP;
      this.proyectsService.saveMaterial(material).subscribe(
        resp => {
          console.log('Material guardado:', resp);
        },
        err => console.error('Error al guardar material:', err)
      );
    });
  }
}
