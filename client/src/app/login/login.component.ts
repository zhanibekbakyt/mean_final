import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
  }

  aim = 'Strengthen Your Financial Future'; 
  account = 'Enter Your Account Number'; 

  acno: any;
  pswd: any;

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


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
}
