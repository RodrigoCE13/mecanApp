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
  precio: number =0;
  annio: number =0;
  tipoDepreciacion: string="";

  preciofinalBj=0;
  preciofinalMd=0;
  preciofinalAl=0;

  depreciacionBj=0.9;
  depreciacionMd=0.85;
  depreciacionAl=0.8;

  devaluacionBj=0.0;
  devaluacionMd=0.0;
  devaluacionAl=0.0;

  anniosdpre=0;
  patente='';
  modelo='';

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
    //this.toastr.info('Hola :)', 'Importante', { positionClass: 'toast-bottom-right' });
    this.cargarVehiculo();
  }

  cargarVehiculo(){
    if(this.id !== null){
      this.loading=true;
      this._vehiculoService.getVehiculo(this.id).subscribe(data=>{
        this.loading=false;
        //console.log(data.payload.data()['precio']);
        this.precio = data.payload.data()['precio'];
        this.annio = data.payload.data()['annio'];
        this.modelo = data.payload.data()['modelo'];
        this.patente = data.payload.data()['patente'];
        this.anniosdpre = parseInt(this.fechaactual.toString()) - this.annio;
        console.log("Diferencia de Años"+this.anniosdpre)
        this.depreciacionVehiculoBaja();
        this.depreciacionVehiculoMedia();
        this.depreciacionVehiculoAlta();
        // this.depreciacionVehiculo(0.16, this.depreciacionBj, 0.84, 0.9, this.devaluacionBj, this.preciofinalBj)
        // this.depreciacionVehiculo(0.24, this.depreciacionMd, 0.76, 0.85, this.devaluacionMd, this.preciofinalMd)
        // this.depreciacionVehiculo(0.32, this.depreciacionAl, 0.68, 0.8, this.devaluacionAl, this.preciofinalAl)
      })
    }
  }

  depreciacionVehiculoMedia(){
    if(this.anniosdpre <= 1){
      this.devaluacionMd = 0.24 * this.precio;
      this.preciofinalMd = this.precio - this.devaluacionMd;
      this.devaluacionMd = Math.trunc(this.devaluacionMd);
      this.preciofinalMd = Math.trunc(this.preciofinalMd);
    }else{
      for(let i = 1; i < (this.anniosdpre - 1); i++){
        this.depreciacionMd = this.depreciacionMd * 0.85;
      }

        this.preciofinalMd = (this.depreciacionMd * 0.76) * this.precio;
        this.devaluacionMd = this.precio - this.preciofinalMd;
        
        if(this.preciofinalMd <= (this.precio * 0.1)){

          this.preciofinalMd = this.precio * 0.1;
          this.devaluacionMd = this.precio * 0.9;
          this.devaluacionMd = Math.trunc(this.devaluacionMd);
          this.preciofinalMd = Math.trunc(this.preciofinalMd);
          this.depreciacionMd=0.85;
        }
        else{
          this.devaluacionMd = Math.trunc(this.devaluacionMd);
          this.preciofinalMd = Math.trunc(this.preciofinalMd);
          this.depreciacionMd=0.85;
        }
    }
  }

  depreciacionVehiculoBaja(){
    if(this.anniosdpre <= 1){
      this.devaluacionBj = 0.16 * this.precio;
      this.preciofinalBj = this.precio - this.devaluacionBj;
      this.devaluacionBj = Math.trunc(this.devaluacionBj);
      this.preciofinalBj = Math.trunc(this.preciofinalBj);
    }else{
      for(let i = 1; i < (this.anniosdpre - 1); i++){
        this.depreciacionBj = this.depreciacionBj * 0.9;
      }
        this.preciofinalBj = (this.depreciacionBj * 0.84) * this.precio; 
        this.devaluacionBj = this.precio - this.preciofinalBj;
        
        if(this.preciofinalBj <= (this.precio * 0.1)){

          this.preciofinalBj = this.precio * 0.1;
          this.devaluacionBj = this.precio * 0.9;
          this.devaluacionBj = Math.trunc(this.devaluacionBj);
          this.preciofinalBj = Math.trunc(this.preciofinalBj);
          this.depreciacionBj = 0.9;
        }
        else{
          this.devaluacionBj = Math.trunc(this.devaluacionBj);
          this.preciofinalBj = Math.trunc(this.preciofinalBj);
          this.depreciacionBj = 0.9;
        }
    }
  }

  depreciacionVehiculoAlta(){
    if(this.anniosdpre <= 1){
      this.devaluacionAl = 0.32 * this.precio;
      this.preciofinalAl = this.precio - this.devaluacionAl;
      this.devaluacionAl = Math.trunc(this.devaluacionAl);
      this.preciofinalAl = Math.trunc(this.preciofinalAl);
    }else{
      for(let i = 1; i < (this.anniosdpre - 1); i++){
        this.depreciacionAl = this.depreciacionAl * 0.8;
      }

        this.preciofinalAl = (this.depreciacionAl * 0.68) * this.precio;
        this.devaluacionAl = this.precio - this.preciofinalAl;
        
        if(this.preciofinalAl <= (this.precio * 0.1)){

          this.preciofinalAl = this.precio * 0.1;
          this.devaluacionAl = this.precio * 0.9;
          this.devaluacionAl = Math.trunc(this.devaluacionAl);
          this.preciofinalAl = Math.trunc(this.preciofinalAl);
          this.depreciacionAl=0.8;
        }
        else{
          this.devaluacionAl = Math.trunc(this.devaluacionAl);
          this.preciofinalAl = Math.trunc(this.preciofinalAl);
          this.depreciacionAl=0.8;
        }
    }
  }

  // depreciacionVehiculo(porcentajeInit: number, porcentajeCalculable: number, porcentajeFijoPrimero: number, 
  //   porcentajeFijoSgtes: number,devaluacion: number, preciofinal: number){
  //   if(this.anniosdpre <= 1){
  //     devaluacion = porcentajeInit * this.precio;
  //     preciofinal = this.precio - devaluacion;
  //     devaluacion = Math.trunc(devaluacion);
  //     preciofinal = Math.trunc(preciofinal);
  //   }else{
  //     console.log("devaluacion: "+devaluacion)
  //     console.log("precio final: "+preciofinal)
  //     for(let i = 1; i < (this.anniosdpre - 1); i++){
  //       porcentajeCalculable = porcentajeCalculable * porcentajeFijoSgtes;
  //     }

  //     preciofinal = (porcentajeCalculable * porcentajeFijoPrimero) * this.precio;
  //     devaluacion = this.precio - preciofinal;
        
  //     if(preciofinal <= (this.precio * 0.1)){

  //       preciofinal = this.precio * 0.1;
  //       devaluacion = this.precio * 0.9;
  //       devaluacion = Math.trunc(devaluacion);
  //       preciofinal = Math.trunc(preciofinal);
  //       console.log("devaluacion lista: "+devaluacion)
  //       console.log("precio final listo: "+preciofinal)
  //     }
  //     else{
  //       devaluacion = Math.trunc(devaluacion);
  //       preciofinal = Math.trunc(preciofinal);
  //       console.log("devaluacion lista: "+devaluacion)
  //       console.log("precio final listo: "+preciofinal)
  //     }
  //   }
  // }

  mostrarDiv(event: any) {
    this.tipoDepreciacion = event.target.value;
  }
}
