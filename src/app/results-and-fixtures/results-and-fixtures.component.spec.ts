import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ResultsAndFixturesComponent } from './results-and-fixtures.component';

describe('ResultsAndFixturesComponent', () => {
  let component: ResultsAndFixturesComponent;
  let fixture: ComponentFixture<ResultsAndFixturesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsAndFixturesComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsAndFixturesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding after each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch fixtures data successfully', () => {
    const mockFixturesData = [
      { fixtureId: 1, homeTeam: 'Team A', awayTeam: 'Team B', score: '3 - 1' },
      { fixtureId: 2, homeTeam: 'Team C', awayTeam: 'Team D', score: '2 - 2' },
    ];

    component.ngOnInit();
    const request = httpMock.expectOne('https://api-football-beta.p.rapidapi.com/fixtures?to=2024-05-19&timezone=UTC&season=2023&status=FT&league=39&from=2023-08-11');

    request.flush({ response: mockFixturesData });

    expect(component.fixturesData).toEqual(mockFixturesData);
  });

  it('should handle API error', () => {
    component.ngOnInit();
    const request = httpMock.expectOne('https://api-football-beta.p.rapidapi.com/fixtures?to=2024-05-19&timezone=UTC&season=2023&status=FT&league=39&from=2023-08-11');

    request.error(new ErrorEvent('Network error'));

    expect(component.fixturesData).toEqual([]);
  });
});
