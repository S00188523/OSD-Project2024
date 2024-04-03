import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  matches: any[] = [];
  fixtures: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchResults();
  }

  fetchResults() {
    const apiUrl = 'https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=1';

    const options = {
      headers: {
        'X-RapidAPI-Key': 'd99ef4d195mshf7ef03579a02ac0p1916b4jsn5524649b62a4',
        'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com'
      }
    };

    this.http.get<any>(apiUrl, options).subscribe(
      (response) => {
        console.log(response); // Log the response to see the data structure
        this.matches = response.matches; // Assign the fetched matches data to the matches array
        this.fixtures = response.fixtures; 
      },
      (error) => {
        console.error(error); // Log any errors if the API call fails
      }
    );
  }
}
