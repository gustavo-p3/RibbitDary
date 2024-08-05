import { Component } from '@angular/core';
import { ProyectsService } from '../../services/proyects.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private proyectsService: ProyectsService, 
    public router: Router, 
    private authService: AuthService
  ) { }

  login() {
    if (!this.username || !this.password) {
      alert('Por favor, ingrese ambos campos.');
      return;
    }
  
    this.proyectsService.login(this.username, this.password).subscribe(
      response => {
        const userId = response.userId;
  
        if (userId) {
          // Redirige al usuario a la ruta con su ID
          this.authService.setAuthToken(true); // Establece el estado de autenticación
          this.router.navigate([`/home/${userId}`]);
        } else {
          console.error('ID de usuario no recibido');
        }
      },
      error => {
        alert('Tus datos de usuario son incorrectos');
        console.error('Error de login', error);
        this.username = '';
        this.password = '';
      }
    );
  }
}
