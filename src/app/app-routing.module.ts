import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { TeamFormComponent } from './teams/team-form/team-form.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: '/'},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'teams', component: TeamListComponent, canActivate: [AuthGuard]},
  {path: 'teams/form', component: TeamFormComponent, canActivate: [AuthGuard]},
  {path: 'teams/:id', component: TeamDetailsComponent, canActivate: [AuthGuard] },
  {path: 'teams/:id/edit', component: TeamFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
