import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.component.html',
  styleUrls: ['./listar-vehiculos.component.css']
})
export class ListarVehiculosComponent implements OnInit {
  vehiculos:any[]=[];
  marcas: any[] = [];
  tipos: any[] = [];

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _vehiculoServices: VehiculoService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getMarcas();
    this.getTipos();
    this.getVehiculos();
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

  getTipos() {
    this._vehiculoServices.getTipos().subscribe(data => {
      this.tipos = [];
      data.forEach((element: any) => {
        const tipo = element.payload.doc.data();
        tipo.id = element.payload.doc.id;
        this.tipos.push(tipo);
      });
    });
  }

  getMarcaNombre(marcaId: string): string {
    const marca = this.marcas.find(m => m.id === marcaId);
    return marca ? marca.nombre : '';
  }

  getTipoNombre(tipoId: string): string {
    const tipo = this.tipos.find(t => t.id === tipoId);
    return tipo ? tipo.nombre : '';
  }

  eliminarVehiculo(id:string){
    this._vehiculoServices.eliminarVehiculo(id).then(()=>{
      console.log('Vehiculo eliminado con exito');
      this.toastr.success('El vehiculo fue eliminado con exito!', 'Vehiculo eliminado',{positionClass: 'toast-top-right'});
    }).catch(error=>{
      console.log(error);
    })
  }

}
