import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSociosComponent } from './crear-socios.component';

describe('CrearSociosComponent', () => {
  let component: CrearSociosComponent;
  let fixture: ComponentFixture<CrearSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearSociosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
