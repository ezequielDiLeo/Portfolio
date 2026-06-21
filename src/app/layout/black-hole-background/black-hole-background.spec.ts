import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackHoleBackground } from './black-hole-background';

describe('BlackHoleBackground', () => {
  let component: BlackHoleBackground;
  let fixture: ComponentFixture<BlackHoleBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackHoleBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackHoleBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
