import { Component } from '@angular/core';
import { ProyectsService } from '../../services/proyects.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private proyectsService: ProyectsService, private router: Router) { }

  login() {
    this.proyectsService.login(this.username, this.password).subscribe(
      response => {
        // Suponiendo que `response` tiene una propiedad `userId`
        const userId = response.userId;
        if (userId) {
          // Redirige al usuario a la ruta con su ID
          this.router.navigate([`/proyectos/${userId}`]);
        } else {
          console.error('ID de usuario no recibido');
        }
      },
      error => {
        // Maneja los errores aquí
        console.error('Error de login', error);
      }
    );
  }
}
