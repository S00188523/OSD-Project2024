import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-results-and-fixtures',
  templateUrl: './results-and-fixtures.component.html',
  styleUrls: ['./results-and-fixtures.component.css']
})
export class ResultsAndFixturesComponent implements OnInit {
  fixturesData: any[] = []; // Variable to store the fetched fixtures data
  filteredFixtures: any[] = [];
  clubFilter: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchFixturesData();
  }

  fetchFixturesData() {
    this.http.get<any>('https://api-football-beta.p.rapidapi.com/fixtures?to=2024-05-19&timezone=UTC&season=2023&status=FT&league=39&from=2023-08-11', {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'd99ef4d195mshf7ef03579a02ac0p1916b4jsn5524649b62a4',
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
      })
    }).subscribe(
      (data: any) => {
        this.fixturesData = data.response;
      },
      (error) => {
        console.error('Error fetching fixtures data:', error);
      }
    );
  }
  
}
