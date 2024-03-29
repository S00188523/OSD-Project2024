import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeamInfo';

  isAuthenticated$ = this.auth.isAuthenticated$

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(res => console.log(res));
  }

  
  handleLogOut() {
    this.auth.logout({
    });
  }

  handleLogIn() {
    this.auth.loginWithRedirect({
      appState: {
        target: this.document.location.pathname,
      },
    });
  }
}
