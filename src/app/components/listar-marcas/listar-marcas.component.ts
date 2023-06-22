import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar-marcas',
  templateUrl: './listar-marcas.component.html',
  styleUrls: ['./listar-marcas.component.css']
})
export class ListarMarcasComponent implements OnInit {
  marcas:any[]=[];
  
  constructor(private fb: FormBuilder,
    private _marcaService: MarcaService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas(){
    this._marcaService.getMarcas().subscribe(data=>{
      this.marcas=[];
      data.forEach((element:any) => {
        this.marcas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarMarca(id: string) {
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
        this._marcaService.eliminarMarca(id).then(() => {
          console.log('Marca eliminada con éxito');
          this.toastr.success('¡La marca fue eliminada con éxito!', 'Marca eliminada', { positionClass: 'toast-bottom-right' });
        }).catch(error => {
          console.log(error);
        });
        Swal.fire(
          '¡Eliminado!',
          'La marca ha sido eliminada.',
          'success'
        );
      }
    });
  }

}
