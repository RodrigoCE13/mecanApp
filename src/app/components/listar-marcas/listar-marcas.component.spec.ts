import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMarcasComponent } from './listar-marcas.component';

describe('ListarMarcasComponent', () => {
  let component: ListarMarcasComponent;
  let fixture: ComponentFixture<ListarMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMarcasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
