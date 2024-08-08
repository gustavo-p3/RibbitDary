import { Component, OnInit } from '@angular/core';
import { SociosComponent } from '../socios/socios.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CreaSocio, Usuario } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-crear-socios',
  templateUrl: './crear-socios.component.html',
  styleUrl: './crear-socios.component.css'
})
export class CrearSociosComponent implements OnInit {
    creaSocio: CreaSocio = {
      nombres: '',
      aPuP: '',
      aPuM: '',
      usuario: '',
      password: '',
      idTipo: '3',
      icono: ''
    };
    confirmpass = '';
    constructor(public router: Router,
      private pryectsServices: ProyectsService,
      private route: ActivatedRoute,
    ) { }
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
  
    crearSocios() {
  
      if(this.creaSocio.password === this.confirmpass){
      this.pryectsServices.crearUsuario(this.creaSocio).subscribe(
        resp => {
          console.log(resp);
          this.router.navigate(['/usuarios'])
        },
        err => console.error('Error al guardar al usuario socio', err)
  
      )
      }else{
        alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
      
      }
    };
  
  }
  

