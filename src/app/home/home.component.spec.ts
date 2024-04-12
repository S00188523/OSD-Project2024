import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TeamService } from '../teams/team.service';
import { AuthService } from '@auth0/auth0-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockTeamService: jasmine.SpyObj<TeamService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockTeamService = jasmine.createSpyObj('TeamService', ['getTeams']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated$']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: TeamService, useValue: mockTeamService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch teams on initialization', () => {
    const teams = [{ id: '1', name: 'Team 1' }, { id: '2', name: 'Team 2' }];
    mockTeamService.getTeams.and.returnValue(of(teams));

    fixture.detectChanges();

    expect(component.teams).toEqual(teams);
    expect(component.filteredTeams).toEqual(teams);
  });

  it('should filter teams based on search query', () => {
    const teams = [{ id: '1', name: 'Team 1' }, { id: '2', name: 'Team 2' }];
    component.teams = teams;

    component.searchQuery = 'Team 1';
    component.onSearch();

    expect(component.filteredTeams).toEqual([{ id: '1', name: 'Team 1' }]);
  });

  it('should navigate to team details page on team name click', () => {
    const routerSpy = spyOn(component.router, 'navigate').and.callThrough();
    const teamId = '1';
    
    component.onTeamNameClick(teamId);
    
    expect(routerSpy).toHaveBeenCalledWith(['/teams', teamId]);
  });

  // Add more test cases as needed
});
