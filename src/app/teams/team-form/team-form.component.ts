import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from'../team.service';
import { Team } from '../team';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent {

  @Input() team? : Team ;
  message: string = '';

  teamForm: FormGroup = new FormGroup({});
  venue: any;

  constructor (private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {
    this.teamForm = new FormGroup({
      name: new FormControl(this.team?.name, [Validators.required]),
      venue: new FormControl(this.team?.venue, [Validators.required]),
      venueCapacity: new FormControl(this.team?.venueCapacity, [Validators.required, this.venuesCapacity()]),
      league: new FormControl(this.team?.league, [Validators.required]),
      kitColour: new FormControl(this.team?.kitColour, [Validators.required]),
      manager: new FormControl(this.team?.manager, [Validators.required]),
    });
  }
  
  venuesCapacity(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const enteredValue = parseInt(control.value, 10);
  
      if (isNaN(enteredValue) || enteredValue < 10000) {
        return { invalidVenueCapacity: true };
      }
  
      return null;
    };
  }
  onSubmit(){
    console.log('form submitted with ');
    console.table(this.teamForm.value);

    if (!this.team){
      this.addNewTeam(this.teamForm.value)
    }
    else {
      this.updateTeam(this.team._id, this.teamForm.value)
    }
  }

  addNewTeam(newTeam: Team): void {
    console.log('Adding new team: ' + JSON.stringify(newTeam));
    this.teamService.createTeam({ ...newTeam })
      .subscribe({
        next: team => {
          this.router.navigateByUrl('/teams/' + team._id);
        },
        error: (err) => {
          console.error('Error adding new team:', err);
          
        }
      });
  }
  updateTeam(id: string, updatedValues: Team)
  {
    this.teamService.updateTeam(id, {...updatedValues})
    .subscribe({
      next: team => {   
        this.router.navigateByUrl('/teams')
      },
      error: (err) => this.message = err
    }); 
  }

  cancel(): void {
    this.router.navigateByUrl('/teams');
  }
}



