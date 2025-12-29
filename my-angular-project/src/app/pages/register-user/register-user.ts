import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service'
import { Login } from '../../models/login.model';
import { FieldStyleDirective } from '../../shared/field-styling.directive';
import { FieldWrapper } from '../../shared/field-wrapper/field-wrapper';
import {
  form,
  required,
  Field,
  submit
} from '@angular/forms/signals';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [Field, RouterModule, FieldWrapper, FieldStyleDirective ],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.scss', '../../styles/forms.scss'],
})
export class RegisterUser {
  readonly model = signal<Login>({
    username: '',
    password: ''
  });
  readonly loginService = inject(LoginService);
  readonly submittedSuccessfully = signal(false);
  
  readonly registerForm = form(this.model, (path) => {
    required( path.username, {
      message: 'Username is required',
    });
  });

  onSubmit() {
    submit(this.registerForm, async frm => {
      console.log('starting to submit the form', this.registerForm().value());
      const res = await this.loginService.register(frm);
      if (!res) {
        this.submittedSuccessfully.set(true);
      }
      return res;
    })
  };
}
