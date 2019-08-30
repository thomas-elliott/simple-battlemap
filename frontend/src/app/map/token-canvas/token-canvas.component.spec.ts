import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenCanvasComponent } from './token-canvas.component';

describe('TokenCanvasComponent', () => {
  let component: TokenCanvasComponent;
  let fixture: ComponentFixture<TokenCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
