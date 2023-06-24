import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  eliminarMarca(id:string){
    this._marcaService.eliminarMarca(id).then(()=>{
      console.log('Marca eliminada con exito');
      this.toastr.success('La marca fue eliminads con exito!', 'Marca eliminado',{positionClass: 'toast-top-right'});
    }).catch(error=>{
      console.log(error);
    })
  }

}
