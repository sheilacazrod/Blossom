import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamerSidenavComponent } from './streamer-sidenav.component';

describe('StreamerSidenavComponent', () => {
  let component: StreamerSidenavComponent;
  let fixture: ComponentFixture<StreamerSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamerSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
