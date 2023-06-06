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
import { ListarMecanicoComponent } from './components/listar-mecanico/listar-mecanico.component';
import { ListarVehiculosComponent } from './components/listar-vehiculos/listar-vehiculos.component';
import { ListaTipoVehiculosComponent } from './components/lista-tipo-vehiculos/lista-tipo-vehiculos.component';
import { ListarMarcasComponent } from './components/listar-marcas/listar-marcas.component';
import { ListarTipoMantencionComponent } from './components/listar-tipo-mantencion/listar-tipo-mantencion.component';
import { VerValorComponent } from './components/ver-valor/ver-valor.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },//redirecciona a login si no hay nada en la url
  { path: 'login',component:LoginComponent },
  { path: 'registrar-usuario',component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'dashboard', component:DashboardComponent },
  
  //mecanico
  { path: 'crear-mecanico', component:CreateMecanicoComponent },//ruta para crear mecanico
  { path: 'editar-mecanico/:id', component:CreateMecanicoComponent },//ruta para editar mecanico(se reutiliza el componente y se le pasa el id)
  { path: 'listar-mecanicos', component:ListarMecanicoComponent },
  
  //tipo vehiculo
  { path: 'crear-tipo-vehiculo', component:CreateTipoVehiculoComponent },
  { path: 'editar-tipo-vehiculo/:id', component:CreateTipoVehiculoComponent },
  { path: 'listar-tipo-vehiculos', component:ListaTipoVehiculosComponent },
  
  //marca
  { path: 'crear-marca', component:CreateMarcaComponent },
  { path: 'editar-marca/:id', component:CreateMarcaComponent },
  { path: 'listar-marcas', component:ListarMarcasComponent },
  
  //mantencion
  { path: 'crear-mantencion', component:CreateMantencionComponent },
  { path: 'editar-mantencion/:id', component:CreateMantencionComponent },
  { path: 'mantenciones', component:VerMantencionesComponent },

  //tipo mantencion
  { path: 'crear-tipo-mantencion', component:CreateTipoMantencionComponent },
  { path: 'editar-tipo-mantencion/:id', component:CreateTipoMantencionComponent },
  { path: 'listar-tipo-mantencion', component:ListarTipoMantencionComponent },

  //vehiculo
  { path: 'crear-vehiculo', component:CreateVehiculoComponent },
  { path: 'editar-vehiculo/:id', component:CreateVehiculoComponent },
  { path: 'listar-vehiculos', component:ListarVehiculosComponent },
  { path: 'valor-vehiculo/:id', component:VerValorComponent},

  { path:'**', redirectTo:'login', pathMatch:'full' }//redirecciona a login si no existe la ruta (siempre poner al final)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
