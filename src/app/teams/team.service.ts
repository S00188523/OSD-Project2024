import { Injectable } from '@angular/core';
import { Observable, throwError, retry, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Team } from './team';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private dataUri = `${environment.apiUri}/teams`;
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    console.log("get teams called");
    const options =  {
      headers: new HttpHeaders().set('X-API-key', 'abcde12345'),
      params: new HttpParams().set('name', 'liverpool') };
 
    return this.http.get<Team[]>(`${this.dataUri}`,options)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getTeam(id: string): Observable<Team> {
    const options = {
      headers: new HttpHeaders().set('X-API-key', 'abcde12345'),
    };

    return this.http.get<Team>(`${this.dataUri}/${id}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  createTeam(team: Team): Observable<Team> {
    const options = {
      headers: new HttpHeaders().set('X-API-key', 'abcde12345'),
    };
  
    return this.http.post<Team>(`${this.dataUri}`, team, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  updateTeam(id: string, team: Team): Observable<Team> {
    console.log('subscribing to update/' + id);
    let teamUri: string = this.dataUri + '/' + id;
    return this.http.put<Team>(teamUri, team)
      .pipe(
        catchError(this.handleError)
      )
  }
  

  deleteTeam(id: string): Observable<void> {
    const options = {
      headers: new HttpHeaders().set('X-API-key', 'abcde12345'),
    };

    return this.http.delete<void>(`${this.dataUri}/${id}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
