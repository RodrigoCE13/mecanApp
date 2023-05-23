import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-vehiculo',
  templateUrl: './create-vehiculo.component.html',
  styleUrls: ['./create-vehiculo.component.css']
})
export class CreateVehiculoComponent implements OnInit {
  createVehiculo: FormGroup;
  submitted = false;
  loading=false;
  id:string| null;
  titulo='Agregar ';
  marcas: any[] = [];
  tipos: any[] = [];

  constructor(private fb: FormBuilder,
    private _vehiculoService: VehiculoService,//<-- Agregamos el servicio (los servicios llevan el guion bajo)
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { 
      this.createVehiculo = this.fb.group({
        patente: ['', Validators.required],
        modelo: ['', Validators.required],
        precio: ['', Validators.required],
        año:['', Validators.required],
        marca: ['', Validators.required],
        tipoVehiculo: ['', Validators.required]
      });
      this.id=this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.esEditar();
    this._vehiculoService.getTipos().subscribe(data => {
      this.tipos = [];
      data.forEach((element: any) => {
        this.tipos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });

    this._vehiculoService.getMarcas().subscribe(data=>{
      this.marcas=[];
      data.forEach((element:any) => {
        this.marcas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  agregarEditar(){
    this.submitted = true;
    if(this.createVehiculo.invalid){
      return
    }
    if(this.id==null){
      this.agregarVehiculo();
    }else{
      this.editarVehiculo(this.id);
    }
    
  }

  editarVehiculo( id:string ){
    
    const vehiculo:any={//<-- Creamos un objeto con los datos del formulario
      patente: this.createVehiculo.value.patente,
      modelo: this.createVehiculo.value.modelo,
      precio: this.createVehiculo.value.precio,
      año: this.createVehiculo.value.año,
      marca: this.createVehiculo.value.marca,
      tipoVehiculo: this.createVehiculo.value.tipoVehiculo,
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    
    this._vehiculoService.actualizarVehiculo(id, vehiculo).then(()=>{
      this.loading=false;
      this.toastr.info('El vehiculo fue modificado con exito!', 'Vehiculo modificado',{positionClass: 'toast-bottom-right'});
      this.router.navigate(['/listar-vehiculos']);
    })
  }

  agregarVehiculo(){
    const vehiculo:any={//<-- Creamos un objeto con los datos del formulario
      patente: this.createVehiculo.value.patente,
      modelo: this.createVehiculo.value.modelo,
      precio: this.createVehiculo.value.precio,
      año: this.createVehiculo.value.año,
      marca: this.createVehiculo.value.marca,
      tipoVehiculo: this.createVehiculo.value.tipoVehiculo,
      fechaCreacion: new Date(),//<-- Agregamos la fecha de creacion y actualizacion para llevar un control de los datos
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    this._vehiculoService.agregarVehiculo(vehiculo).then(()=>{
      console.log('Vehiculo creado con exito');
      this.toastr.success('El vehiculo fue registrado con exito!', 'Vehiculo registrado',{positionClass: 'toast-bottom-right'});
      this.loading=false;
      this.router.navigate(['/listar-vehiculos']);
    }).catch(error=>{
      console.log(error);
      this.loading=false;
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo='Editar ';
      this.loading=true;
      this._vehiculoService.getVehiculo(this.id).subscribe(data=>{
        this.loading=false;
        console.log(data.payload.data()['patente']);
        this.createVehiculo.setValue({
          patente: data.payload.data()['patente'],
          modelo: data.payload.data()['modelo'],
          precio: data.payload.data()['precio'],
          año: data.payload.data()['año'],
          marca: data.payload.data()['marca'],
          tiposVehiculo: data.payload.data()['tipoVehiculo'],
        })
      })
    }
  }

}
