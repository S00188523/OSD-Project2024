import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Team } from '../team';
import { TeamService } from '../team.service';

import { TeamListComponent } from './team-list.component';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let mockTeamService: any;

  beforeEach(async () => {
    mockTeamService = jasmine.createSpyObj('TeamService', ['getTeams']);

    await TestBed.configureTestingModule({
      declarations: [ TeamListComponent ],
      providers: [{ provide: TeamService, useValue: mockTeamService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch teams on initialization', () => {
    const mockTeams: Team[] = [
      { _id: '1', name: 'Team 1', venue: 'Venue 1', venueCapacity: 10000, league: 'League 1', kitColour: 'Red', manager: 'Manager 1' },
      { _id: '2', name: 'Team 2', venue: 'Venue 2', venueCapacity: 20000, league: 'League 2', kitColour: 'Blue', manager: 'Manager 2' }
    ];
    mockTeamService.getTeams.and.returnValue(of(mockTeams));

    fixture.detectChanges();

    expect(component.teams$).toBeTruthy();
    component.teams$.subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });
  });
});
