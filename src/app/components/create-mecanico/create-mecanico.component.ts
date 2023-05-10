import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MecanicoService } from '../../services/mecanico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-mecanico',
  templateUrl: './create-mecanico.component.html',
  styleUrls: ['./create-mecanico.component.css']
})
export class CreateMecanicoComponent implements OnInit {
  createMecanico: FormGroup;
  submitted = false;
  loading=false;
  id:string| null;//<-- Variable para almacenar el id del mecanico
  titulo='Agregar ';

  constructor(private fb: FormBuilder,
    private _mecanicoService: MecanicoService,//<-- Agregamos el servicio (los servicios llevan el guion bajo)
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute//<-- Agregamos el modulo ActivatedRoute para obtener el id del mecanico
    ) { 
    this.createMecanico = this.fb.group({
      nombre: ['', Validators.required],
      fono: [],
      direccion: [],
    });
    this.id=this.aRoute.snapshot.paramMap.get('id');//<-- Obtenemos el id del mecanico que viene por la url
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditar(){//<-- Metodo para agregar un mecanico
    this.submitted = true;
    if(this.createMecanico.invalid){//<-- Si el formulario es invalido no hacemos nada
      return
    }
    if(this.id==null){
      this.agregarMecanico();
    }else{
      this.editarMecanico(this.id);
    }
    
  }

  editarMecanico( id:string ){
    
    const mecanico:any={//<-- Creamos un objeto con los datos del formulario
      nombre: this.createMecanico.value.nombre,
      fono: this.createMecanico.value.fono,
      direccion: this.createMecanico.value.direccion,
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    
    this._mecanicoService.actualizarMecanico(id, mecanico).then(()=>{
      this.loading=false;
      this.toastr.info('El mecanico fue modificado con exito!', 'Mecanico modificado',{positionClass: 'toast-bottom-right'});
      this.router.navigate(['/listar-mecanicos']);
    })
  }

  agregarMecanico(){
    const mecanico:any={//<-- Creamos un objeto con los datos del formulario
      nombre: this.createMecanico.value.nombre,
      fono: this.createMecanico.value.fono,
      direccion: this.createMecanico.value.direccion,
      fechaCreacion: new Date(),//<-- Agregamos la fecha de creacion y actualizacion para llevar un control de los datos
      fechaActualizacion: new Date(),
    }
    this.loading=true;
    this._mecanicoService.agregarMecanico(mecanico).then(()=>{//<-- Llamamos al metodo agregarMecanico del servicio y le pasamos el objeto mecanico
      console.log('Mecanico creado con exito');
      this.toastr.success('El mecanico fue registrado con exito!', 'Mecanico registrado',{positionClass: 'toast-bottom-right'});
      this.loading=false;
      this.router.navigate(['/listar-mecanicos']);
    }).catch(error=>{
      console.log(error);
      this.loading=false;
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo='Editar ';
      this.loading=true;
      this._mecanicoService.getMecanico(this.id).subscribe(data=>{
        this.loading=false;
        console.log(data.payload.data()['nombre']);
        this.createMecanico.setValue({
          nombre: data.payload.data()['nombre'],
          fono: data.payload.data()['fono'],
          direccion: data.payload.data()['direccion'],
        })
      })
    }
  }



  //metodo para limpiar campos:
  limpiarCampos(){
    this.createMecanico.reset();
    //this.submitted=false;
  }

}
