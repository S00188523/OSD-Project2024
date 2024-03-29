import { Component, OnInit } from '@angular/core';
import { TeamService } from '../teams/team.service'; 
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teams: any[] = []; 
  filteredTeams: any[] = [];
  searchQuery: string = '';
  isLoggedIn: boolean = false;

  constructor(private teamService: TeamService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Fetch the list of teams 
    this.teamService.getTeams().subscribe((data) => {
      this.teams = data;
      this.filteredTeams = [...this.teams]; 
    });

    // Check if the user is logged in
    this.authService.isAuthenticated$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  onSearch(): void {
    // Filter teams based on the search query
    this.filteredTeams = this.teams.filter((team) =>
      team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

   // Handle team name click
   onTeamNameClick(teamId: string): void {
    // Navigate to the team details page
    this.router.navigate(['/teams', teamId]);
  }
}

