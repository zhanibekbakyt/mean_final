import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  acno: any;
  uname: any;
  pswd: any;

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  
  register() {
    const acno = this.registerForm.value.acno;
    const uname = this.registerForm.value.uname;
    const pswd = this.registerForm.value.pswd;

    if (this.registerForm.valid) {
      this.ds.register(acno, uname, pswd).subscribe(
        (result: any) => {
          alert(result.message);
          this.router.navigateByUrl('');
        },
        (result) => {
          alert(result.error.message);
        }
      )
    }


  }


}
