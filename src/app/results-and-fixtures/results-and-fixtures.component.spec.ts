import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAndFixturesComponent } from './results-and-fixtures.component';

describe('ResultsAndFixturesComponent', () => {
  let component: ResultsAndFixturesComponent;
  let fixture: ComponentFixture<ResultsAndFixturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsAndFixturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsAndFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
