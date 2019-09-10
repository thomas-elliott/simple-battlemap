import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenWindowComponent } from './token-window.component';

describe('TokenWindowComponent', () => {
  let component: TokenWindowComponent;
  let fixture: ComponentFixture<TokenWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
