import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-ver-valor',
  templateUrl: './ver-valor.component.html',
  styleUrls: ['./ver-valor.component.css']
})
export class VerValorComponent implements OnInit {
  loading=false;
  id:string| null;
  precio=0;
  preciofinal=0;
  annio=0;
  patente='';
  modelo='';
  depreciaciona1=0.84;
  depreciaciona1c=0.0;
  depreciacionas=0.9;
  devaluacion=0.0;
  ad=0;
  fecha = new Date();
  fechaactual = this.fecha.getFullYear();

  constructor(private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private _vehiculoService: VehiculoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { 
      this.id=this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.toastr.info('Hola :)', 'Importante', { positionClass: 'toast-bottom-right' });
    this.cargarVehiculo();
  }

  cargarVehiculo(){
    if(this.id !== null){
      this.loading=true;
      this._vehiculoService.getVehiculo(this.id).subscribe(data=>{
        this.loading=false;
        console.log(data.payload.data()['precio']);
        this.precio = data.payload.data()['precio'];
        this.annio = data.payload.data()['annio'];
        this.modelo = data.payload.data()['modelo'];
        this.patente = data.payload.data()['patente'];
        this.depreciacionVehiculo(this.annio, this.precio)
      })
    }
  }


  depreciacionVehiculo(annio:number, precio:number){
    this.ad = parseInt(this.fechaactual.toString()) - annio;
    console.log(this.ad)
    if(this.ad <= 1){
      this.devaluacion = this.depreciaciona1 * precio;
      this.preciofinal = precio - this.devaluacion;
      this.devaluacion = Math.trunc(this.devaluacion);
      this.preciofinal = Math.trunc(this.preciofinal);
    }else{
      for(let i = 1; i <= (this.ad - 1); i++){
        this.depreciacionas = this.depreciacionas * this.depreciacionas;
      }
      if(this.depreciacionas === 0){
        this.preciofinal = 0.10 * precio;
        this.devaluacion = precio * 0.9;
      }else{
        this.devaluacion = (this.depreciacionas * this.depreciaciona1) * precio;
        this.preciofinal = precio - this.devaluacion;
        this.devaluacion = Math.trunc(this.devaluacion);
        this.preciofinal = Math.trunc(this.preciofinal);
      }
    }
  }

}
