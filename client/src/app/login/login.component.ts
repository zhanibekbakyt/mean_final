import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { // 3rd executed
  // class is collection of properties and methods

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { // 1st executed
    // used for object initialization
    // It automatically invokes when an object is created.
  }

  ngOnInit(): void {// 2nd executed
    // Initial process of a component
    // when a component is created at same time it initialize or authorize
    // when a component is created there is a lifecycle for it.
  }

  // Properties
  aim = 'Strengthen Your Financial Future'; // string interpolation (component to view)
  account = 'Enter Your Account Number';  // Property binding - [attributes_name] = 'property'

  // To hold the value from the user
  acno: any;
  pswd: any;

  //model for login
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  // Userdefined functions // 4th executed

  login() {
    const acno = this.loginForm.value.acno;
    const pswd = this.loginForm.value.pswd;
    if (this.loginForm.valid) {
      this.ds.login(acno, pswd).subscribe(
        (result: any) => {
          localStorage.setItem('Token', JSON.stringify(result.token))
          localStorage.setItem('currentUser', JSON.stringify(result.currentUser))
          localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
          alert(result.message);
          this.router.navigateByUrl('dashboard');
        },
        (result) => {
          alert(result.error.message);
        }
      )
    }
  }








  //Event binding - (event_name) = "function_name"   
  // login(a:any, p:any){ 
  //   const acno = a.value;
  //   const pswd = p.value;
  //   let userDetails = this.userDetails;
  //   if(acno in userDetails){
  //     if(pswd == userDetails[acno].password){
  //       alert('login successfull');
  //     }else{
  //       alert('Incorrect password');
  //     }
  //   }else{
  //     alert('user not found');
  //   }
  // }

  //Event binding using $event - (event_name) = function_name($event) 
  // acnoChange(event:any){
  //   console.log(event.target.value);
  //   this.acno = event.target.value;
  //   console.log(this.acno);
  // }     
  // pswdChange(event:any){  
  //   console.log(event.target.value);
  //   this.pswd = event.target.value;
  //   console.log(this.pswd);
  // }
}
