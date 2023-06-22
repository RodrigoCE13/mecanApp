import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoMantencionComponent } from './listar-tipo-mantencion.component';

describe('ListarTipoMantencionComponent', () => {
  let component: ListarTipoMantencionComponent;
  let fixture: ComponentFixture<ListarTipoMantencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoMantencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTipoMantencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
