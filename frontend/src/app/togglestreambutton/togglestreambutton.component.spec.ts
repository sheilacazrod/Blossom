import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglestreambuttonComponent } from './togglestreambutton.component';

describe('TogglestreambuttonComponent', () => {
  let component: TogglestreambuttonComponent;
  let fixture: ComponentFixture<TogglestreambuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogglestreambuttonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TogglestreambuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
