import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  acno: any;
  transactions: any[] = [];
  filterType: 'all' | 'credit' | 'debit' = 'all';

  constructor(private ds: DataService) {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || 'null');
    if (this.acno) {
      this.ds.getTransaction(this.acno).subscribe(
        (result: any) => {
          this.transactions = result.transaction || [];
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }

  get filteredTransactions() {
    if (this.filterType === 'all') {
      return this.transactions;
    }
    return this.transactions.filter(t => t.type.toLowerCase() === this.filterType);
  }
}
