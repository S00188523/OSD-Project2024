import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch teams data successfully', () => {
    const mockResponse = {
      response: [
        {
          league: {
            standings: [
              // Sample standings data
              { position: 1, team: 'Team A', points: 25 },
              { position: 2, team: 'Team B', points: 20 },
            ]
          }
        }
      ]
    };

    component.ngOnInit();
    const request = httpMock.expectOne('https://api-football-beta.p.rapidapi.com/standings?season=2023&league=39');

    request.flush(mockResponse);

    expect(component.teams).toEqual(mockResponse.response[0].league.standings[0]);
  });

  it('should handle API error', () => {
    component.ngOnInit();
    const request = httpMock.expectOne('https://api-football-beta.p.rapidapi.com/standings?season=2023&league=39');

    request.error(new ErrorEvent('Network error'));

    expect(component.teams).toEqual([]);
  });
});
