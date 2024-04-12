import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { TeamService } from '../team.service';
import { Team } from '../team';

import { TeamFormComponent } from './team-form.component';

describe('TeamFormComponent', () => {
  let component: TeamFormComponent;
  let fixture: ComponentFixture<TeamFormComponent>;
  let mockTeamService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockTeamService = jasmine.createSpyObj('TeamService', ['createTeam', 'updateTeam']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ TeamFormComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: TeamService, useValue: mockTeamService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with team data', () => {
    const mockTeam: Team = {
      _id: '1',
      name: 'Test Team',
      venue: 'Test Venue',
      venueCapacity: 20000,
      league: 'Test League',
      kitColour: 'Test Colour',
      manager: 'Test Manager'
    };

    component.team = mockTeam;
    component.ngOnInit();

    expect(component.teamForm.get('name')?.value).toEqual(mockTeam.name);
    expect(component.teamForm.get('venue')?.value).toEqual(mockTeam.venue);
    expect(component.teamForm.get('venueCapacity')?.value).toEqual(mockTeam.venueCapacity);
    expect(component.teamForm.get('league')?.value).toEqual(mockTeam.league);
    expect(component.teamForm.get('kitColour')?.value).toEqual(mockTeam.kitColour);
    expect(component.teamForm.get('manager')?.value).toEqual(mockTeam.manager);
  });

  it('should call addNewTeam on form submission for new team', () => {
    const mockFormValue = {
      name: 'Test Team',
      venue: 'Test Venue',
      venueCapacity: 20000,
      league: 'Test League',
      kitColour: 'Test Colour',
      manager: 'Test Manager'
    };
    component.teamForm = new FormGroup({
      name: new FormControl(mockFormValue.name, Validators.required),
      venue: new FormControl(mockFormValue.venue, Validators.required),
      venueCapacity: new FormControl(mockFormValue.venueCapacity, [Validators.required, component.venuesCapacity()]),
      league: new FormControl(mockFormValue.league, Validators.required),
      kitColour: new FormControl(mockFormValue.kitColour, Validators.required),
      manager: new FormControl(mockFormValue.manager, Validators.required)
    });

    component.onSubmit();

    expect(mockTeamService.createTeam).toHaveBeenCalledWith(mockFormValue);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/teams/1');
  });

  it('should call updateTeam on form submission for existing team', () => {
    const mockTeam: Team = { _id: '1' };
    component.team = mockTeam;

    const mockFormValue = {
      name: 'Test Team',
      venue: 'Test Venue',
      venueCapacity: 20000,
      league: 'Test League',
      kitColour: 'Test Colour',
      manager: 'Test Manager'
    };
    component.teamForm = new FormGroup({
      name: new FormControl(mockFormValue.name, Validators.required),
      venue: new FormControl(mockFormValue.venue, Validators.required),
      venueCapacity: new FormControl(mockFormValue.venueCapacity, [Validators.required, component.venuesCapacity()]),
      league: new FormControl(mockFormValue.league, Validators.required),
      kitColour: new FormControl(mockFormValue.kitColour, Validators.required),
      manager: new FormControl(mockFormValue.manager, Validators.required)
    });

    component.onSubmit();

    expect(mockTeamService.updateTeam).toHaveBeenCalledWith(mockTeam._id, mockFormValue);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/teams');
  });

  it('should navigate back on cancel', () => {
    component.cancel();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/teams');
  });
});
