import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToChatComponent } from './login-to-chat.component';

describe('LoginToChatComponent', () => {
  let component: LoginToChatComponent;
  let fixture: ComponentFixture<LoginToChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginToChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginToChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
