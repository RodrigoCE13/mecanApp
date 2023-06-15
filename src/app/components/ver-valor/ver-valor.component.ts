import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-valor',
  templateUrl: './ver-valor.component.html',
  styleUrls: ['./ver-valor.component.css']
})
export class VerValorComponent implements OnInit {
  tipoDepreciacion: string="";

  constructor() { }

  ngOnInit(): void {
  }
  mostrarDiv(event: any) {
    this.tipoDepreciacion = event.target.value;
  }
}
