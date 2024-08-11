import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { Colors, Legend, PieController, Chart, ArcElement, Tooltip, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { DemoService } from '../services/demo.service';
import { Data } from '../services/data.model';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
Chart.register(PieController, Legend, Colors, ArcElement, Tooltip);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, DecimalPipe],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  data!:Data;
  savings = NaN;
  budget = NaN;
  percentage = NaN;
  incomeLabels: string[] = [];
  incomeData: number[] = [];
  expenseLabels: string[] = [];
  expenseData: number[] = [];
  income!:ChartData;
  expense!:ChartData;
  demoService = inject(DemoService);
  subscription!: Subscription;
  destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.subscription = this.demoService.demo$.subscribe(demoData => {
      this.data = demoData;

      let main = this.data.accounts.main;
      let income = this.data.accounts.income;
      let expense = this.data.accounts.expense;
  
      this.savings = main[0].balance;
      this.budget = main[1].balance;
      this.percentage = this.calcPercentage(main[2].balance, main[2].target);
  
      this.incomeLabels = income.map(v => v.name);
      this.incomeData = income.map(v => v.balance);
      this.expenseLabels = expense.map(v => v.name);
      this.expenseData = expense.map(v => v.balance);
  
      this.income = {
        labels: this.incomeLabels,
        datasets: [{
          label: 'Income',
          data: this.incomeData,
          hoverOffset: 10
        }]
      };
  
      this.expense = {
        labels: this.expenseLabels,
        datasets: [{
          label: 'Expense',
          data: this.expenseData,
          hoverOffset: 10
        }]
      };
    });

    this.destroyRef.onDestroy(() => this.subscription.unsubscribe());
  }

  calcPercentage(balance: number, target: number) {
    let percentage = Math.floor((100 * balance) / target);
    
    if (percentage > 100) {
      return 100;
    } else {
      return percentage;
    }
  }
}
