import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'//<-- modulo de firebase
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';//modulo para la base de datos
import { AngularFireAuthModule } from '@angular/fire/compat/auth';//modulo para la autenticacion

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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListarMecanicoComponent } from './components/listar-mecanico/listar-mecanico.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ListarVehiculosComponent } from './components/listar-vehiculos/listar-vehiculos.component';
import { ListaTipoVehiculosComponent } from './components/lista-tipo-vehiculos/lista-tipo-vehiculos.component';
import { ListarMarcasComponent } from './components/listar-marcas/listar-marcas.component';
import { ListarTipoMantencionComponent } from './components/listar-tipo-mantencion/listar-tipo-mantencion.component';
import { VerValorComponent } from './components/ver-valor/ver-valor.component';

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
    VerMantencionesComponent,
    ListarMecanicoComponent,
    ListarVehiculosComponent,
    ListaTipoVehiculosComponent,
    ListarMarcasComponent,
    ListarTipoMantencionComponent,
    VerValorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,//agregamos el modulo de formularios reactivos
    AngularFireModule.initializeApp(environment.firebaseConfig),//agregamos el modulo de firebase 
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AngularFirestoreModule,
    CollapseModule.forRoot(),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
