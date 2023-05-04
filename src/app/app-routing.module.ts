import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateVehiculoComponent } from './components/create-vehiculo/create-vehiculo.component';
import { CreateMantencionComponent } from './components/create-mantencion/create-mantencion.component';
import { CreateMecanicoComponent } from './components/create-mecanico/create-mecanico.component';
import { CreateTipoMantencionComponent } from './components/create-tipo-mantencion/create-tipo-mantencion.component';
import { CreateTipoVehiculoComponent } from './components/create-tipo-vehiculo/create-tipo-vehiculo.component';
import { CreateMarcaComponent } from './components/create-marca/create-marca.component';
import { VerMantencionesComponent } from './components/ver-mantenciones/ver-mantenciones.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },//redirecciona a login si no hay nada en la url
  { path: 'login',component:LoginComponent },
  { path: 'registrar-usuario',component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'crear-vehiculo', component:CreateVehiculoComponent },
  { path: 'crear-mantencion', component:CreateMantencionComponent },
  { path: 'crear-mecanico', component:CreateMecanicoComponent },
  { path: 'crear-tipo-mantencion', component:CreateTipoMantencionComponent },
  { path: 'crear-tipo-vehiculo', component:CreateTipoVehiculoComponent },
  { path: 'crear-marca', component:CreateMarcaComponent },
  { path: 'mantenciones', component:VerMantencionesComponent },
  { path:'**', redirectTo:'login', pathMatch:'full' }//redirecciona a login si no existe la ruta (siempre poner al final)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
