import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { NavigationComponent } from './components/navegacion/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { NavNarLatComponent } from './components/navegacion/nav-nar-lat/nav-nar-lat.component';
import { ProyectsService } from './services/proyects.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SociosComponent } from './components/usuarios/socios/socios.component';
import { CrearSociosComponent } from './components/usuarios/crear-socios/crear-socios.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { BienvenidaComponent } from './components/usuarios/bienvenida/bienvenida.component';


const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PresentacionComponent,
    NavigationComponent,
    NavNarLatComponent,
    SociosComponent,
    CrearSociosComponent,
    CrearUsuarioComponent,
    BienvenidaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes), // Asegúrate de que `routes` esté definido
  ],
  providers: [
    ProyectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
