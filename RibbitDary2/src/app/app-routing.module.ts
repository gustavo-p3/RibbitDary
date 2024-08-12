import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { SociosComponent } from './components/usuarios/socios/socios.component';
import { CrearSociosComponent } from './components/usuarios/crear-socios/crear-socios.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path : '',
    redirectTo : '/presentacion',
    pathMatch : 'full'
  },

  //Presentacion
  {path:'presentacion', component: PresentacionComponent},
  {path:'socios', component: SociosComponent},
  {path:'crear-socios', component: CrearSociosComponent},
  {path: 'crear-usuarios', component: CrearUsuarioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
