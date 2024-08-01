import { Component } from '@angular/core'
import { Colors, Legend, PieController, Chart, ArcElement, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
Chart.register(PieController, Legend, Colors, ArcElement, Tooltip);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  incomeLabels = ['test1', 'test2', 'test3'];
  expenseLabels = ['test1', 'test2', 'test3'];
  percentage = '50%';
  
  income = {
    labels: this.incomeLabels,
    datasets: [{
      label: 'Income',
      data: [300, 50, 100],
      hoverOffset: 10
    }]
  };

  expense = {
    labels: this.expenseLabels,
    datasets: [{
      label: 'Income',
      data: [300, 50, 100],
      hoverOffset: 10
    }]
  };
  
}
