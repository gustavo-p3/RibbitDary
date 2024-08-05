import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { TareasComponent } from './components/proyects/tareas/tareas.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { ProyectosComponent } from './components/proyects/proyectos/proyectos.component';
import { CreateProyectosComponent } from './components/proyects/create-proyectos/create-proyectos.component'; 
import { CreateTareasComponent } from './components/proyects/create-tareas/create-tareas.component'; 
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/presentacion',
    pathMatch: 'full'
  },

  // Presentacion
  { path: 'presentacion', component: PresentacionComponent },

  // Rutas de tareas
  { path: 'tareas/:idU/:idP', component: TareasComponent },
  { path: 'crear-tareas/:idU/:idP', component: CreateTareasComponent },
  { path: 'edit-tarea/edit/:idU/:idP/:idT', component: CreateTareasComponent },

  // Comentarios
  { path: 'comentarios', component: ComentariosComponent },

  // Rutas Proyectos
  { path: 'proyectos/:idU', component: ProyectosComponent },
  { path: 'crear-proyectos', component: CreateProyectosComponent },
  { path: 'crear-proyectos/:idU', component: CreateProyectosComponent },
  { path: 'edit-proyectos/edit/:idU/:idP', component: CreateProyectosComponent },

  // Home
  { path: 'home/:idU', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
