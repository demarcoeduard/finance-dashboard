import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(transactions: any[], searchTerm: any): any {
    if (!searchTerm) {
      return transactions;
    }

    searchTerm = searchTerm.toLowerCase();
      
    return transactions.filter(t => 
      t.source.toLowerCase().includes(searchTerm) ||
      t.receiver.toLowerCase().includes(searchTerm)
    )
  }

}
