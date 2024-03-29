import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService } from '../team.service';
import { TeamsModule } from '../teams.module';
import { Team } from '../team';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {

  teams$: Observable<Team[]> ;

  constructor (private teamService: TeamService) {
    this.teams$ = this.teamService.getTeams();
  }

}
