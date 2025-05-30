import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser:any;
  currentAcno:any; 

  userDetails:any = {
    1000 : {acno:1000, username:'Amal', password:1000, balance:2000, transaction:[]},
    1001 : {acno:1001, username:'Arun', password:1001, balance:2000, transaction:[]},
    1002 : {acno:1002, username:'Akshay', password:1002, balance:2000, transaction:[]}
  }

  constructor(private http:HttpClient) { }

  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('Database',JSON.stringify(this.userDetails));

      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));

      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));
    }
  }

  register(acno:any, uname:any, pswd:any){
    const password = pswd;
    const username = uname;
    const body = {
      acno,
      username,
      password
    }
    return this.http.post('https://mean-final-7akm.vercel.app:3000/register', body);
  }

  login(acno:any, pswd:any){
    const password = pswd;
    const body = {
      acno,
      password
    }
    return this.http.post('https://mean-final-7akm.vercel.app:3000/login', body);
  }

  getToken(){
    const token = JSON.parse(localStorage.getItem('Token') || '');
    let header = new HttpHeaders()
    if(token){
      options.headers = header.append('x-access-token', token);
    }
    return options
  }

  deposit(acno:any, pswd:any, dAmt:any){
    const body = {
      acno:acno,
      password:pswd,
      dAmt:dAmt
    }
    return this.http.post('https://mean-final-7akm.vercel.app:3000/deposit', body, this.getToken());
  }
  
  withdraw(acno1:any, pswd1:any, wAmt:any){
   const body = {
    acno:acno1,
    password:pswd1,
    wAmt:wAmt
   }
   return this.http.post('https://mean-final-7akm.vercel.app:3000/withdraw', body, this.getToken());
  }

  getTransaction(acno:any){
    const body = {
      acno
    }
    return this.http.post('https://mean-final-7akm.vercel.app:3000/transaction', body, this.getToken());
  }

  deleteAcc(acno:any){
    return this.http.delete('https://mean-final-7akm.vercel.app:3000/deleteAcc/'+acno)
  }

  getBalance(acno:any) {
    const body = {
      acno
    }
    return this.http.post('https://mean-final-7akm.vercel.app:3000/getBalance', body)
  }
  
}
