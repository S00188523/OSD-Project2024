import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamListComponent } from './team-list/team-list.component';
import { MaterialModule } from '../material.module';
import { TeamFormComponent } from './team-form/team-form.component';


@NgModule({
  declarations: [
    TeamDetailsComponent,
    TeamListComponent,
    TeamFormComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule { }
