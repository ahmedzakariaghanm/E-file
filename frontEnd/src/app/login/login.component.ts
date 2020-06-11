import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFormSubmitted  =  false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router

    ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
  });
  }
  login(){
    this.isFormSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else{
    let ret = this.authService.login(this.loginForm.value)
    if(ret){
      this.router.navigateByUrl('/contacts');
    }
    }
}

}
