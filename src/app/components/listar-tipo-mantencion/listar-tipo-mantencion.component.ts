import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMantencionPrevService } from '../../services/tipo-mantencion-prev.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  eliminarTiposMantencion(id:string){
    this._tipoMantencionService.eliminarTipoMantencion(id).then(()=>{
      console.log('Tipo eliminada con exito');
      this.toastr.error('El tipo fue eliminado con exito!', 'Tipo eliminado',{positionClass: 'toast-bottom-right'});
    }).catch(error=>{
      console.log(error);
    })
  }

}
