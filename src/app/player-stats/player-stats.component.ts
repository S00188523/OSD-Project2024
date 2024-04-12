import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {
  playerStats: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPlayerStats();
  }

  fetchPlayerStats() {
    const apiUrl = 'https://api-football-beta.p.rapidapi.com/players/topscorers?season=2023&league=39';
  
    const options = {
      headers: {
        'X-RapidAPI-Key': 'd99ef4d195mshf7ef03579a02ac0p1916b4jsn5524649b62a4',
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
      }
    };
  
    this.http.get<any>(apiUrl, options).subscribe(
      (response) => {
        console.log(response); 
        this.playerStats = response.response; 
      },
      (error) => {
        console.error(error);// Log any errors 
      }
    );
  }
  
}
