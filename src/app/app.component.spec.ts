import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout', 'loginWithRedirect']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PremierLeague'`, () => {
    expect(component.title).toEqual('TeamInfo');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('TeamInfo');
  });

  it('should call authService.logout() when handleLogOut() is called', () => {
    component.handleLogOut();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should call authService.loginWithRedirect() when handleLogIn() is called', () => {
    component.handleLogIn();
    expect(authService.loginWithRedirect).toHaveBeenCalled();
  });

  it('should set isAuthenticated$ to observable from AuthService', waitForAsync(() => {
    const mockAuthState = of(true);
    authService.isAuthenticated$ = mockAuthState;
    fixture.detectChanges();
    component.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toEqual(true);
    });
  }));

  it('should log user when ngOnInit is called', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    authService.user$ = of(mockUser);
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith(mockUser);
  });
});
