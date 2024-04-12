import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlayerStatsComponent } from './player-stats.component';

describe('PlayerStatsComponent', () => {
  let component: PlayerStatsComponent;
  let fixture: ComponentFixture<PlayerStatsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerStatsComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerStatsComponent);
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

  it('should fetch player stats successfully', () => {
    const mockPlayerStats = [
      { name: 'Player 1', goals: 10 },
      { name: 'Player 2', goals: 8 },
      // Add more mock player stats as needed
    ];

    component.ngOnInit();
    const request = httpMock.expectOne('https://api-football-beta.p.rapidapi.com/players/topscorers?season=2023&league=39');

    request.flush({ response: mockPlayerStats });

    expect(component.playerStats).toEqual(mockPlayerStats);
  });

  it('should handle API error', () => {
    component.ngOnInit();
    const request = httpMock.expectOne('https://api-football-beta.p.rapidapi.com/players/topscorers?season=2023&league=39');

    request.error(new ErrorEvent('Network error'));

    expect(component.playerStats).toEqual([]);
  });
});
