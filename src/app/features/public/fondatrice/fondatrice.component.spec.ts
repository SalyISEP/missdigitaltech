import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondatriceComponent } from './fondatrice.component';

describe('FondatriceComponent', () => {
  let component: FondatriceComponent;
  let fixture: ComponentFixture<FondatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondatriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
