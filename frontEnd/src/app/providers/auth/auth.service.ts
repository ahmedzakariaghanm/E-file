import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private toastr: ToastrService,
    private router: Router
    ) { }
    
  public login(User){
    if( (User.userName == 'user1' && User.password == 'user1') || (User.userName == 'user2' && User.password == 'user2') ){
      localStorage.setItem('user',User.userName);
      this.toastr.success("Welcome " + User.userName + ", nice to see you again")
      return true;
    }
    else{
      this.toastr.error("Wrong user name or password , please check it again ")
      return false;
    }
  } 

  public isLoggedIn(){
    return localStorage.getItem('user') !== null;
  }

  public logout(){
    localStorage.removeItem('user');
    this.router.navigate(["/"]);
  }

}
