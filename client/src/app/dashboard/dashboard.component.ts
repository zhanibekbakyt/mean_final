import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  acno: any;
  pswd: any;
  dAmt: any;
  acno1: any;
  pswd1: any;
  wAmt: any;
  user: any; 
  sDate: any;

  balance:any;
  displayAboutUs = 'none';

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    if (localStorage.getItem('currentUser')) {
      this.sDate = Date();
      this.user = JSON.parse(localStorage.getItem('currentUser') || "");
    }
  }
  ngOnInit(): void {
    this.getBalance()
  }

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    dAmt: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  deposit() {
    const acno = this.depositForm.value.acno;
    const pswd = this.depositForm.value.pswd;
    const dAmt = this.depositForm.value.dAmt;
    const currentAcno = JSON.parse(localStorage.getItem('currentAcno') || "");
    if (this.depositForm.valid) {
      if (currentAcno == acno) {
        this.ds.deposit(acno, pswd, dAmt).subscribe(
          (result: any) => {
            alert(result.message);
            this.depositForm.reset();
            this.ngOnInit()
          },
          (result: any) => {
            alert(result.error.message);
          })
      } else {
        alert('invalid user details')
      }
    }
  }

  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    wAmt: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  withdraw() {
    const acno1 = this.withdrawForm.value.acno1;
    const pswd1 = this.withdrawForm.value.pswd1;
    const wAmt = this.withdrawForm.value.wAmt;
    const currentAcno = JSON.parse(localStorage.getItem('currentAcno') || "")

    if (this.withdrawForm.valid) {
      if (acno1 == currentAcno) {
        const result = this.ds.withdraw(acno1, pswd1, wAmt).subscribe(
          (result: any) => {
            alert(result.message);
            this.withdrawForm.reset();
            this.ngOnInit()
          },
          (result: any) => {
            alert(result.error.message);
          }
        )
      } else {
        alert('invalid user details');
      }
    }
  }

  logout() {
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('');
  }

  delete() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '');
  }

  onCancel() {
    this.acno = "";
  }

  onDelete(acno: any) {
    this.ds.deleteAcc(acno).subscribe(
      (result: any) => {
        alert(result.message);

        localStorage.removeItem('currentAcno');
        localStorage.removeItem('currentUser');

        this.router.navigateByUrl('');
      },
      (result) => {
        alert(result.error.message);
      }
    )
  }

  getBalance(){
    const acno:any = JSON.parse(localStorage.getItem('currentAcno') || "")
    this.ds.getBalance(acno).subscribe(
      (result:any) => {
        this.balance = result.balance
      },
      (result:any) => {
        alert(result.error.message)
      }
    )
  }

  showAbout(){
    this.displayAboutUs = 'block'
  }
  hideAbout(){
    this.displayAboutUs = 'none'
  }
}
