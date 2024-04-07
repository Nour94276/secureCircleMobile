import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  };

  constructor() { }

  login() {
    console.log('User login', this.user);
    // Ajoutez ici votre logique d'authentification
  }
}
