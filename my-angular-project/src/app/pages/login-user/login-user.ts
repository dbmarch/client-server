import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from '../../models/login.model';
import { FieldStyleDirective } from '../../shared/field-styling.directive';
import { FieldWrapper } from '../../shared/field-wrapper/field-wrapper';
import {
  form,
  required,
} from '@angular/forms/signals';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [RouterModule, CommonModule,FieldWrapper, FieldStyleDirective ],
  templateUrl: './login-user.html',
  styleUrl: './login-user.scss',
})
export class LoginUser {
  readonly model = signal<Login>({
    username: '',
    password: ''
  });

  readonly loginForm = form(this.model, (path) => {
    required( path.username, {
      message: 'Username is required',
    });


  });

}
