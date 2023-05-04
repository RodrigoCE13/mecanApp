import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMantencionesComponent } from './ver-mantenciones.component';

describe('VerMantencionesComponent', () => {
  let component: VerMantencionesComponent;
  let fixture: ComponentFixture<VerMantencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMantencionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMantencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
