import { Component, OnInit } from '@angular/core';
import { Proyect, Proyectxcolab } from '../../../models/Proyect';
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

  colaboradoresSeleccionados: any[] = [];
  colaSelect: any[] = [];
  colaDispo: any[] = [];
  tempDeletedColaboradores: string[] = [];


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

    } else {
      console.error('No se pudo obtener el idP de la ruta.');
    }

    if (this.idU) {
      this.proyectsService.getUserxUser(this.idU).subscribe(
        resp => {
          this.colaDispo = resp;
        },
        err => console.log(err)
      );
    } else {
      console.error('No se pudo obtener el idP de la ruta.');
    }
    this.getColaboradores();
  }


  toggleColaboradorSeleccionado(idColaborador: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.colaboradoresSeleccionados.includes(idColaborador)) {
        this.colaboradoresSeleccionados.push(idColaborador);
      }
    } else {
      this.colaboradoresSeleccionados = this.colaboradoresSeleccionados.filter(id => id !== idColaborador);
    }
  }



  getColaboradores() {
    this.idP = this.route.snapshot.paramMap.get('idP');

    if (this.idP) {

      this.proyectsService.getColaboradores(this.idP).subscribe(
        resp => {
          console.log(resp);
          this.colaSelect = resp;
        },
        err => console.log(err)
      );
    }
  }

  async saveNewProyect() {
    const idU = this.route.snapshot.paramMap.get('idU');

    if (idU) {
      this.proyect.idU = idU;

      try {
        const resp = await this.proyectsService.saveProyect(this.proyect).toPromise();
        console.log('Proyecto guardado:', resp);

        if (resp && resp.idP) {
          const idP = resp.idP.toString();
          this.saveNewProyectxColab(idP);
        }
      } catch (err) {
        console.error('Error al guardar proyecto:', err);
      }
    }
  }


  saveNewProyectxColab(idP: string) {
    if (idP && this.colaboradoresSeleccionados.length > 0) {
      this.colaboradoresSeleccionados.forEach(idColaborador => {
        const proyectxcolab: Proyectxcolab = {
          idColaborador: idColaborador,
          idP: idP
        };
        this.proyectsService.savePColaboradores(proyectxcolab).subscribe(
          resp => {
            console.log('Colaborador guardado:', resp);
          },
          err => console.error('Error al guardar colaborador en el proyecto:', err)
        );
      });

      // Redirigir después de un retraso para asegurar que todos los colaboradores se guarden
      setTimeout(() => {
        this.router.navigate(['/proyects']);
      }, 1000);

    } else {
      this.router.navigate(['/proyects']);
    }
  }

  deleteColaborador(idU: string) {
    this.idP = this.route.snapshot.paramMap.get('idP');

    if (this.idP) {
      // Agregar el ID del colaborador a la lista temporal
      this.tempDeletedColaboradores.push(idU);

      // Actualizar la lista de colaboradores temporalmente
      this.getColaboradores();
    }
  }


  async updateProyect() {

    if (this.proyect.idP) {
      const number: number = Number(this.proyect.idP);

      try {
        // Actualizar el proyecto
        const resp = await this.proyectsService.updateProyect(number, this.proyect).toPromise();
        console.log('Proyecto actualizado:', resp);

        for (const idU of this.tempDeletedColaboradores) {
          if (this.idP) {
            await this.proyectsService.deletePColaborador(this.idP, idU).toPromise();
          }
        }

        await this.saveNewProyectxColab(number.toString());

        this.router.navigate(['/proyects']);
      } catch (err) {
        console.error('Error al actualizar el proyecto:', err);
      }
    } else {
      console.error('ID del proyecto no encontrado.');
    }
  }

}
