import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm: FormGroup;
  passwordForm: FormGroup;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;

  registrationFailed: boolean;

  constructor(fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', Validators.required);
    this.confirmPasswordCtrl = fb.control('', Validators.required);

    this.passwordForm = fb.group({
          password: this.passwordCtrl,
          confirmPassword: this.confirmPasswordCtrl
        }, {
          validators: RegisterComponent.passwordMatch
        });
    this.birthYearCtrl = fb.control('', [
      Validators.required, Validators.min(1900),
      Validators.max(new Date().getFullYear())]);
    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  static passwordMatch(control: FormGroup) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    return password !== confirmPassword ? { matchingError: true } : null;
  }

  register() {
    this.userService.register(
      this.userForm.value.login,
      this.userForm.value.passwordForm.password,
      this.userForm.value.birthYear
      )
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        () => {
          this.registrationFailed = true;
        }
      );
  }
}
