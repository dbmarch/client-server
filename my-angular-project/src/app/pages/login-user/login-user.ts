import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from '../../models/login.model';
import { FieldStyleDirective } from '../../shared/field-styling.directive';
import { FieldWrapper } from '../../shared/field-wrapper/field-wrapper';
import {
  form,
  required,
  Field,
  submit
} from '@angular/forms/signals';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [Field, RouterModule, CommonModule,FieldWrapper, FieldStyleDirective ],
  templateUrl: './login-user.html',
  styleUrls: ['./login-user.scss', '../../styles/forms.scss'],

})
export class LoginUser {
  readonly model = signal<Login>({
    username: '',
    password: ''
  });
  readonly loginService = inject(LoginService);
  readonly submittedSuccessfully = signal(false);


  readonly loginForm = form(this.model, (path) => {
    required( path.username, {
      message: 'Username is required',
    });
  });

  onSubmit() {
    submit(this.loginForm, async frm => {
      console.log('starting to submit the form', this.loginForm().value());
      const res = await this.loginService.login(frm);
      if (!res) {
        this.submittedSuccessfully.set(true);
      }
      return res;
    })
  };
}
