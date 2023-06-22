import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMantencionPrevService } from '../../services/tipo-mantencion-prev.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar-tipo-mantencion',
  templateUrl: './listar-tipo-mantencion.component.html',
  styleUrls: ['./listar-tipo-mantencion.component.css']
})
export class ListarTipoMantencionComponent implements OnInit {
  tiposMantencion:any[]=[];

  constructor(private fb: FormBuilder,
    private _tipoMantencionService: TipoMantencionPrevService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTiposMantencion();
  }
  getTiposMantencion(){
    this._tipoMantencionService.getTipoMantenciones().subscribe(data=>{
      this.tiposMantencion=[];
      data.forEach((element:any) => {
        this.tiposMantencion.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }
  eliminarTiposMantencion(id: string) {
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
        this._tipoMantencionService.eliminarTipoMantencion(id).then(() => {
          console.log('Tipo eliminado con éxito');
          this.toastr.error('¡El tipo fue eliminado con éxito!', 'Tipo eliminado', { positionClass: 'toast-bottom-right' });
        }).catch(error => {
          console.log(error);
        });
        Swal.fire(
          '¡Eliminado!',
          'El tipo ha sido eliminado.',
          'success'
        );
      }
    });
  }
  

}
