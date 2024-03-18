import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPlayerComponent } from './dplayer.component';

describe('DPlayerComponent', () => {
  let component: DPlayerComponent;
  let fixture: ComponentFixture<DPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
