import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { CreateVehiculoComponent } from './components/create-vehiculo/create-vehiculo.component';
import { CreateMantencionComponent } from './components/create-mantencion/create-mantencion.component';
import { CreateMecanicoComponent } from './components/create-mecanico/create-mecanico.component';
import { CreateTipoMantencionComponent } from './components/create-tipo-mantencion/create-tipo-mantencion.component';
import { CreateTipoVehiculoComponent } from './components/create-tipo-vehiculo/create-tipo-vehiculo.component';
import { CreateMarcaComponent } from './components/create-marca/create-marca.component';
import { VerMantencionesComponent } from './components/ver-mantenciones/ver-mantenciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    HeaderComponent,
    CreateVehiculoComponent,
    CreateMantencionComponent,
    CreateMecanicoComponent,
    CreateTipoMantencionComponent,
    CreateTipoVehiculoComponent,
    CreateMarcaComponent,
    VerMantencionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,//agregamos el modulo de formularios reactivos
    AngularFireModule.initializeApp(environment.firebaseConfig),//agregamos el modulo de firebase 
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
