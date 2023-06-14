import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MecanicoService } from '../../services/mecanico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-mecanico',
  templateUrl: './listar-mecanico.component.html',
  styleUrls: ['./listar-mecanico.component.css']
})
export class ListarMecanicoComponent implements OnInit {
  mecanicos:any[]=[];//<-- Arreglo para almacenar los mecanicos

  constructor(private fb: FormBuilder,
    private _mecanicoService: MecanicoService,//<-- Agregamos el servicio (los servicios llevan el guion bajo)
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMecanicos();
  }


  getMecanicos(){//<-- Metodo para obtener los mecanicos
    this._mecanicoService.getMecanicos().subscribe(data=>{//<-- Nos suscribimos al observable para obtener los mecanicos
      this.mecanicos=[];//<-- Inicializamos el arreglo
      data.forEach((element:any) => {//<-- Recorremos los elementos de la coleccion
        this.mecanicos.push({//<-- Agregamos los elementos al arreglo
          id: element.payload.doc.id,//<-- Obtenemos el id del documento
          ...element.payload.doc.data()//con ... accedemos a los datos del documento
        })
      });
    });
  }

  eliminarMecanico(id:string){//<-- Metodo para eliminar un mecanico
    this._mecanicoService.eliminarMecanico(id).then(()=>{//<-- Llamamos al metodo eliminarMecanico del servicio y le pasamos el id del mecanico
      console.log('Mecanico eliminado con exito');
      this.toastr.error('El mecanico fue eliminado con exito!', 'Mecanico eliminado',{positionClass: 'toast-bottom-right'});
    }).catch(error=>{
      console.log(error);
    })
  }
}
