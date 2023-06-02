import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MantencionService } from '../../services/mantencion.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-ver-mantenciones',
  templateUrl: './ver-mantenciones.component.html',
  styleUrls: ['./ver-mantenciones.component.css']
})
export class VerMantencionesComponent implements OnInit {
  mantenciones:any[]=[];
  vehiculos: any[] = [];
  mecanicos: any[] = [];
  tiposPrev: any[] = [];
  tiposLegal: any[] = [];

  constructor(private _mantencionService: MantencionService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getMantenciones();
    this.getVehiculos();
    this.getMecanicos();
    this.getTiposPrev();
    this.getTiposLegal();
  }
  getMantenciones() {
    this._mantencionService.getMantenciones().subscribe(data => {
      this.mantenciones = [];
      data.forEach((element: any) => {
        const mantencion = element.payload.doc.data();
        mantencion.id = element.payload.doc.id;
        this.mantenciones.push(mantencion);
      });
      console.log(this.mantenciones);
    });
  }
  getVehiculos(){
    this._mantencionService.getVehiculos().subscribe(data => {
      this.vehiculos = [];
      data.forEach((element: any) => {
        const vehiculo = element.payload.doc.data();
        vehiculo.id = element.payload.doc.id;
        this.vehiculos.push(vehiculo);
      });
      console.log(this.vehiculos);
    });
  }
  getMecanicos(){
    this._mantencionService.getMecanicos().subscribe(data => {
      this.mecanicos = [];
      data.forEach((element: any) => {
        const mecanico = element.payload.doc.data();
        mecanico.id = element.payload.doc.id;
        this.mecanicos.push(mecanico);
      });
      console.log(this.mecanicos);
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
      console.log(this.tiposPrev);
    });
  }
  getTiposLegal(){
    this._mantencionService.getTipoLegal().subscribe(data => {
      this.tiposLegal = [];
      data.forEach((element: any) => {
        const tipoLegal = element.payload.doc.data();
        tipoLegal.id = element.payload.doc.id;
        this.tiposLegal.push(tipoLegal);
      });
      console.log(this.tiposLegal);
    });
  }

  getVehiculoPatente(vehiculoId: string): string {
    const vehiculo = this.vehiculos.find(t => t.id === vehiculoId);
    return vehiculo ? vehiculo.patente : '';
  }
  getMecanicoNombre(mecanicoId: string): string {
    const mecanico = this.mecanicos.find(t => t.id === mecanicoId);
    return mecanico ? mecanico.nombre : '';
  }
  getTipoPrevNombre(tipoPId: string): string {
    const tipoP = this.tiposPrev.find(t => t.id === tipoPId);
    return tipoP ? tipoP.nombre : '';
  }
  getTipoLegalNombre(tipoLId: string): string {
    const tipoL = this.tiposLegal.find(t => t.id === tipoLId);
    return tipoL ? tipoL.nombre : '';
  }

  eliminarMantencion(id:string){
    this._mantencionService.eliminarMantencion(id).then(()=>{
      console.log('Mantencion eliminada con exito');
      this.toastr.error('La mantencion fue eliminada con exito!', 'Mantencion eliminada',{positionClass: 'toast-bottom-right'});
    }).catch(error=>{
      console.log(error);
    })
  }


}
