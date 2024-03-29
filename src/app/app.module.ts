import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamService } from './teams/team.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamsModule } from './teams/teams.module';
import { SharedModule } from './shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment  } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import {AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    TeamsModule,
    SharedModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    AuthModule.forRoot({...environment.auth0,
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.apiUri}/teams/*`,
            httpMethod: 'PUT',
          },
          {
            uri: `${environment.apiUri}/teams`,
            httpMethod: 'POST',
          },
          {
            uri: `${environment.apiUri}/teams/*`,
            httpMethod: 'DELETE',
          },
        ]}
      })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
