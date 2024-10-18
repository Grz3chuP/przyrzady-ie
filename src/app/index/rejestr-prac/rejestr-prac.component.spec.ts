import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejestrPracComponent } from './rejestr-prac.component';

describe('RejestrPracComponent', () => {
  let component: RejestrPracComponent;
  let fixture: ComponentFixture<RejestrPracComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejestrPracComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejestrPracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
