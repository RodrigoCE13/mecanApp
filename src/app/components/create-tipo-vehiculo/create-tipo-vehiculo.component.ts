import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoVehiculoService } from '../../services/tipo-vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-tipo-vehiculo',
  templateUrl: './create-tipo-vehiculo.component.html',
  styleUrls: ['./create-tipo-vehiculo.component.css']
})
export class CreateTipoVehiculoComponent implements OnInit {
  createTipoVehiculo: FormGroup;
  submitted = false;
  loading=false;
  id:string| null;
  titulo='Agregar ';

  constructor(private fb: FormBuilder,
    private _tipoVehiculoService: TipoVehiculoService,//<-- Agregamos el servicio (los servicios llevan el guion bajo)
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
      this.createTipoVehiculo = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.id=this.aRoute.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditar(){
    this.submitted = true;
    if(this.createTipoVehiculo.invalid){
      return
    }
    if(this.id==null){
      this.agregarTipoVehiculo();
    }else{
      this.editarTipoVehiculo(this.id);
    }
  }

  editarTipoVehiculo( id:string ){
    
    const tipoVehiculo:any={//<-- Creamos un objeto con los datos del formulario
      nombre: this.createTipoVehiculo.value.nombre,
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    
    this._tipoVehiculoService.actualizarTipoVehiculo(id, tipoVehiculo).then(()=>{
      this.loading=false;
      this.toastr.info('El tipo fue modificado con exito!', 'Tipo modificada',{positionClass: 'toast-bottom-right'});
      this.router.navigate(['/listar-tipo-vehiculos']);
    })
  }

  agregarTipoVehiculo(){
    const tipoVehiculo:any={
      nombre: this.createTipoVehiculo.value.nombre,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    this._tipoVehiculoService.agregarTipoVehiculo(tipoVehiculo).then(()=>{
      console.log('Tipo creado con exito');
      this.toastr.success('El tipo fue registrada con exito!', 'Tipo registrada',{positionClass: 'toast-bottom-right'});
      this.loading=false;
      this.router.navigate(['/listar-tipo-vehiculos']);
    }).catch(error=>{
      console.log(error);
      this.loading=false;
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo='Editar ';
      this.loading=true;
      this._tipoVehiculoService.getTipoVehiculo(this.id).subscribe(data=>{
        this.loading=false;
        console.log(data.payload.data()['nombre']);
        this.createTipoVehiculo.setValue({
          nombre: data.payload.data()['nombre'],
        })
      })
    }
  }

}
