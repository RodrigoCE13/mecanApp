import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoVehiculoService } from '../../services/tipo-vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lista-tipo-vehiculos',
  templateUrl: './lista-tipo-vehiculos.component.html',
  styleUrls: ['./lista-tipo-vehiculos.component.css']
})
export class ListaTipoVehiculosComponent implements OnInit {
  tiposVehiculo:any[]=[];

  constructor(private fb: FormBuilder,
    private _tipoVehiculoService: TipoVehiculoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTiposVehiculo();
  }

  getTiposVehiculo(){
    this._tipoVehiculoService.getTipoVehiculos().subscribe(data=>{
      this.tiposVehiculo=[];
      data.forEach((element:any) => {
        this.tiposVehiculo.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.tiposVehiculo);
    });
  }
  eliminarTiposVehiculo(id:string){
    this._tipoVehiculoService.eliminarTipoVehiculo(id).then(()=>{
      console.log('Tipo eliminada con exito');
      this.toastr.error('El tipo fue eliminado con exito!', 'Tipo eliminado',{positionClass: 'toast-bottom-right'});
    }).catch(error=>{
      console.log(error);
    })
  }
}
