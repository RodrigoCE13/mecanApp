import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { MantencionService } from '../../services/mantencion.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehiculos: any[] = [];
  marcas: any[] = [];
  proximasMantenciones: any[] = [];
  dataUser:any;
  tiposPrev: any[] = [];

  constructor(private _vehiculoServices: VehiculoService,
    private _mantencionService: MantencionService,
    private afAuth: AngularFireAuth,
    private router:Router) { }

  ngOnInit(): void {
    this.getProximasMantenciones();
    this.getVehiculos();
    this.getMarcas();
    this.getTiposPrev();
    this.afAuth.currentUser.then((user)=>{//<-- Obtenemos el usuario actual
      if(user && user.emailVerified){
        this.dataUser=user; //<-- Si el usuario existe y el correo esta verificado lo asignamos a la variable dataUser
      }else{
        this.router.navigate(['/login']);
      }
    })
    this.checkUserAuthentication();
  }

  getCurrentDate(): Date {//<-- Función para obtener la fecha actual
    return new Date();
  }
  
  checkUserAuthentication(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // El usuario está autenticado
        console.log('Usuario autenticado:', user);
        // Puedes realizar acciones adicionales aquí, como redirigir a una página específica
      } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
        // Puedes realizar acciones adicionales aquí, como redirigir a la página de inicio de sesión
      }
    });
  }
  getProximasMantenciones() {
    this._mantencionService.getMantencionesByFechaProx().subscribe(data => {
      this.proximasMantenciones = [];
      data.forEach((element: any) => {
        const mantencion = element.payload.doc.data();
        mantencion.id = element.payload.doc.id;
        this.proximasMantenciones.push(mantencion);
      });
    });
  }
  getVehiculos() {
    this._vehiculoServices.getVehiculos().subscribe(data => {
      this.vehiculos = [];
      data.forEach((element: any) => {
        const vehiculo = element.payload.doc.data();
        vehiculo.id = element.payload.doc.id;
        this.vehiculos.push(vehiculo);
      });
    });
  }
  getTiposPrev(){
    this._mantencionService.getTipoPrev().subscribe(data => {
      this.tiposPrev = [];
      data.forEach((element: any) => {
        const tipoPrev = element.payload.doc.data();
        tipoPrev.id = element.payload.doc.id;
        this.tiposPrev.push(tipoPrev);
      });
    });
  }
  getMarcas() {
    this._vehiculoServices.getMarcas().subscribe(data => {
      this.marcas = [];
      data.forEach((element: any) => {
        const marca = element.payload.doc.data();
        marca.id = element.payload.doc.id;
        this.marcas.push(marca);
      });
    });
  }
  
  getVehiculoPatente(patenteId: string): string {
    const vehiculo = this.vehiculos.find(v => v.id === patenteId);
    return vehiculo ? vehiculo.patente : '';
  }
  getTipoPrevNombre(tipoPId: string): string {
    const tipoP = this.tiposPrev.find(t => t.id === tipoPId);
    return tipoP ? tipoP.nombre : '';
  }
  getMarcaNombre(marcaId: string): string {
    const marca = this.marcas.find(m => m.id === marcaId);
    return marca ? marca.nombre : '';
  }

}
