import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-create-marca',
  templateUrl: './create-marca.component.html',
  styleUrls: ['./create-marca.component.css']
})
export class CreateMarcaComponent implements OnInit {
  createMarca: FormGroup;
  submitted = false;
  loading=false;
  id:string| null;
  titulo='Agregar ';

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _marcaService: MarcaService,//<-- Agregamos el servicio (los servicios llevan el guion bajo)
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { 
      this.createMarca = this.fb.group({
        nombre: ['', Validators.required],
      });
      this.id=this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.toastr.info('Los campos que contengan * son obligatorios', 'Importante', { positionClass: 'toast-bottom-right' });
    this.esEditar();
  }

  agregarEditar(){
    this.submitted = true;
    if(this.createMarca.invalid){
      return
    }
    if(this.id==null){
      this.agregarMarca();
    }else{
      this.editarMarca(this.id);
    }
  }

  
  editarMarca( id:string ){
    
    const marca:any={//<-- Creamos un objeto con los datos del formulario
      nombre: this.createMarca.value.nombre,
      fechaActualizacion: new Date(),
    }
    this.loading=true;

    this.afAuth.currentUser.then(user=>{
      if(user){
        marca.userId=user.uid;
      }
    
      this._marcaService.actualizarMarca(id, marca).then(()=>{
        this.loading=false;
        this.toastr.info('La marca fue modificada con exito!', 'Marca modificada',{positionClass: 'toast-bottom-right'});
        this.router.navigate(['/listar-marcas']);
      })
    })
  }

  agregarMarca(){
    const marca:any={
      nombre: this.createMarca.value.nombre,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading=true;

    this.afAuth.currentUser.then(user=>{
      if(user){
        marca.userId=user.uid;
      }

      this._marcaService.agregarMarca(marca).then(()=>{
       console.log('Marca creado con exito');
        this.toastr.success('La marca fue registrada con exito!', 'Marca registrada',{positionClass: 'toast-bottom-right'});
        this.loading=false;
        this.router.navigate(['/listar-marcas']);
      }).catch(error=>{
        console.log(error);
        this.loading=false;
      })
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo='Editar ';
      this.loading=true;
      this._marcaService.getMarca(this.id).subscribe(data=>{
        this.loading=false;
        console.log(data.payload.data()['nombre']);
        this.createMarca.setValue({
          nombre: data.payload.data()['nombre'],
        })
      })
    }
  }

}
