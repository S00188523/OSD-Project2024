import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  teams: any[] = []; // This array will hold the fetched teams data
  apiURL = 'https://api-football-beta.p.rapidapi.com/standings?season=2023&league=39';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTeamsData();
  }

  fetchTeamsData() {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '53e309dae6msh003548360caec76p1071f1jsnf32f4b233470',
      'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
    });

    this.http.get<any>(this.apiURL, { headers }).subscribe(
      (response) => {
        console.log(response); // Log the response to see the data structure
        if (response && response.response) {
          this.teams = response.response[0].league.standings[0]; // Assign the fetched teams data to the teams array
        }
      },
      (error) => {
        console.error(error); // Log any errors if the API call fails
      }
    );
  }
}
