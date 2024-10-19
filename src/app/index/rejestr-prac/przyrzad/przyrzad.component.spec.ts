import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzyrzadComponent } from './przyrzad.component';

describe('PrzyrzadComponent', () => {
  let component: PrzyrzadComponent;
  let fixture: ComponentFixture<PrzyrzadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrzyrzadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrzyrzadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
