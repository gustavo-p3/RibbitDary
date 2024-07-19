import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarea, Proyect } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.component.html',
  styleUrls: ['./create-tareas.component.css']
})
export class CreateTareasComponent implements OnInit {
  tarea: Tarea = {
    idP: '', // Solo idP se inicializa desde la ruta
    nomTarea: '',
    fechaI: '',
    descripcion: '',
    Materiales: [],
    fechaF: '',
    idColaboradores: 'opcion1',
  };
  proyects: any = [];
  newMaterial: string = '';

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idP = this.route.snapshot.paramMap.get('idP');
   if (idP) {

      this.tarea.idP = idP; // Asigna el idP obtenido de la ruta 

      this.proyectsService.getProyect(idP).subscribe(
        resp => {
          this.proyects = resp;
        },
        err => console.error('Error al obtener proyectos:', err)
      );
  
    }
  }

  addMaterial() { //Agregar Materiales temporalmente y subirlos
    if (this.newMaterial.trim()) {
      this.tarea.Materiales?.push({ Material: this.newMaterial });
      this.newMaterial = '';
    }
  }

  saveNewTarea() {

  /*  const selectedUser = 
    this.proyects.PersonasInvolucradas.find(user => user.NombrePersonasInvolucradas 
      === this.tarea.PersonaACargo);
    
    if (selectedUser) {
      this.tarea.IconUser = selectedUser.IconUser; // Asignar el IconUser del usuario seleccionado a la tarea
    }
    
  this.proyects*/
    this.proyectsService.saveTarea(this.tarea).subscribe(
      resp => { 
        console.log('Tarea guardada:', resp); 

      },
      err => console.error('Error al guardar tarea:', err)
    );
  }
  
}
