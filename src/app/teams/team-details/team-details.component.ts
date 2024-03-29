import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent {

  id: string | null= "";
  message: string = ""
  showForm: boolean = false;

  team?: Team;

  constructor (public dialog: MatDialog, private router : Router, 
    private route: ActivatedRoute, private teamService: TeamService,
    private snackBar: MatSnackBar) {}
  
  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id');
  
  if (this.id) {
    this.teamService.getTeam(this.id).subscribe({
      next: (value: Team) => this.team = value,
      complete: () => console.log('team service finished'),
      error: (message) => {
        this.openErrorSnackBar (message);
      }
    })
  }
  
  }
  
  deleteTeam() {
   this.openConfirmDeleteDialog();
  }
  
  editTeam() {
    this.showForm = true;
  }
  
  
  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { title: "Delete Team "+ this.team?.name, 
       message: "Are you sure you want to remove this Team"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked "Yes", perform the delete operation
        this.deleteItem();
      } 
    });
  
  }
  
  
  deleteItem() {
    // Ensures that this.contact is not null or undefined before trying to access _id
    if (this.team && this.team._id) {
      this.teamService.deleteTeam(this.team._id)
        .subscribe({
          next: team => {
            console.log(JSON.stringify(team) + ' has been deleted');
            this.message = "team has been deleted";
            this.router.navigateByUrl('/teams');
          },
          error: (message) => {
            this.openErrorSnackBar(message);
          }
        });
    } else {
      this.openErrorSnackBar("Cannot delete teams with undefined or null ID");
    }
  }
  
  
  
  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 15000, // Set the duration for how long the snackbar should be visible (in milliseconds)
      panelClass: ['error-snackbar'], // You can define custom styles for the snackbar
    });
  }
  
  back(): void {
    this.router.navigateByUrl('/teams');
  }
}
