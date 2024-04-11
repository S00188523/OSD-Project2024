import { Component, OnInit } from '@angular/core';
import { TeamService } from '../teams/team.service'; 
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
  news: any[] = [];

  newsPerPage = 1; // Number of news items per page
  totalPage = 1; // Total number of pages
  currentPage = 1; // Current page
  displayedNews: any[] = []; // News items to display on the current page

  constructor(private teamService: TeamService, private authService: AuthService, private router: Router, private http: HttpClient) { }

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

    this.fetchNews();
  }

  fetchNews() {
     const url = 'https://football-news-aggregator-live.p.rapidapi.com/news/fourfourtwo/epl';
    const headers = {
       'X-RapidAPI-Key': '53e309dae6msh003548360caec76p1071f1jsnf32f4b233470',
      'X-RapidAPI-Host': 'football-news-aggregator-live.p.rapidapi.com' 
    };

    this.http.get<any[]>(url, { headers }).subscribe((news) => {
      // Filter out duplicate news items
      const uniqueNews = this.getUniqueNews(news);
      this.news = uniqueNews;

      // Calculate total pages based on the number of news items
      this.totalPage = Math.ceil(this.news.length / this.newsPerPage);
      // Initialize displayed news
      this.showNewsPage(1);
    });
  }

  getUniqueNews(news: any[]): any[] {
    const uniqueNews: any[] = [];
    const seenUrls: Set<string> = new Set();

    for (const item of news) {
      // Check if the news item URL has already been seen
      if (!seenUrls.has(item.url)) {
        // If not, add it to the unique news list and mark it as seen
        uniqueNews.push(item);
        seenUrls.add(item.url);
      }
    }

    return uniqueNews;
  }

  showNewsPage(page: number) {
    // Calculate start and end indices for the current page
    const startIndex = (page - 1) * this.newsPerPage;
    const endIndex = Math.min(startIndex + this.newsPerPage, this.news.length);
    // Set displayed news to the news items for the current page
    this.displayedNews = this.news.slice(startIndex, endIndex);
    // Update current page
    this.currentPage = page;
  }

  showNextNews() {
    // Show news for the next page
    if (this.currentPage < this.totalPage) {
      this.showNewsPage(this.currentPage + 1);
    }
  }

  showPreviousNews() {
    // Show news for the previous page
    if (this.currentPage > 1) {
      this.showNewsPage(this.currentPage - 1);
    }
  }

  onSearch(): void {
    // Filter teams based on search query
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
