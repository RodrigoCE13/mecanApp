import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoVehiculosComponent } from './lista-tipo-vehiculos.component';

describe('ListaTipoVehiculosComponent', () => {
  let component: ListaTipoVehiculosComponent;
  let fixture: ComponentFixture<ListaTipoVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipoVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTipoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
