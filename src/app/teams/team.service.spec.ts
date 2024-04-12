import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamService } from './team.service';
import { Team } from './team';

describe('TeamService', () => {
  let service: TeamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService]
    });
    service = TestBed.inject(TeamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch teams', () => {
    const mockTeams: Team[] = [
      { _id: '1', name: 'Team 1', venue: 'Venue 1', venueCapacity: 10000, league: 'League 1', kitColour: 'Red', manager: 'Manager 1' },
      { _id: '2', name: 'Team 2', venue: 'Venue 2', venueCapacity: 20000, league: 'League 2', kitColour: 'Blue', manager: 'Manager 2' }
    ];

    service.getTeams().subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });

    const req = httpMock.expectOne(`${service['dataUri']}?name=liverpool`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should fetch a team by id', () => {
    const mockTeam: Team = { _id: '1', name: 'Team 1', venue: 'Venue 1', venueCapacity: 10000, league: 'League 1', kitColour: 'Red', manager: 'Manager 1' };

    service.getTeam('1').subscribe(team => {
      expect(team).toEqual(mockTeam);
    });

    const req = httpMock.expectOne(`${service['dataUri']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeam);
  });

  it('should create a new team', () => {
    const mockTeam: Team = { name: 'Team 1', venue: 'Venue 1', venueCapacity: 10000, league: 'League 1', kitColour: 'Red', manager: 'Manager 1' };

    service.createTeam(mockTeam).subscribe(team => {
      expect(team).toEqual(mockTeam);
    });

    const req = httpMock.expectOne(service['dataUri']);
    expect(req.request.method).toBe('POST');
    req.flush(mockTeam);
  });

  it('should update an existing team', () => {
    const mockTeam: Team = { _id: '1', name: 'Updated Team', venue: 'Updated Venue', venueCapacity: 20000, league: 'Updated League', kitColour: 'Blue', manager: 'Updated Manager' };

    service.updateTeam('1', mockTeam).subscribe(team => {
      expect(team).toEqual(mockTeam);
    });

    const req = httpMock.expectOne(`${service['dataUri']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockTeam);
  });

  it('should delete an existing team', () => {
    service.deleteTeam('1').subscribe(response => {
      expect(response).toEqual(undefined);
    });

    const req = httpMock.expectOne(`${service['dataUri']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle HTTP errors', () => {
    const errorMessage = 'Internal Server Error';

    service.getTeams().subscribe(
      () => {},
      error => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('Something bad happened; please try again later.');
      }
    );

    const req = httpMock.expectOne(`${service['dataUri']}?name=liverpool`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('error', {
      message: errorMessage
    }));
  });
});
