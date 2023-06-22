import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MecanicoService } from '../../services/mecanico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

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

  eliminarMecanico(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._mecanicoService.eliminarMecanico(id).then(() => {
          console.log('Mecánico eliminado con éxito');
          this.toastr.error('¡El mecánico fue eliminado con éxito!', 'Mecánico eliminado', { positionClass: 'toast-bottom-right' });
        }).catch(error => {
          console.log(error);
        });
        Swal.fire(
          '¡Eliminado!',
          'Tu archivo ha sido eliminado.',
          'success'
        );
      }
    });
  }
  
}
