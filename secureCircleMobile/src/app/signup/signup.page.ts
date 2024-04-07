import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupForm = {
    nom: '',
    prenom: '',
    email: '',
    password: ''
  };

  constructor() {}

  onSignup() {
    console.log('Form Signup', this.signupForm);
    // Ajoutez ici la logique pour traiter les données du formulaire d'inscription
  }
}
