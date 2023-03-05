import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {
  private falsyValues = new Set([false, 0]);
  transform<T>(items: T[], propertyName: string, value: any): T[] {

    return items.filter(item => {
      if (!value && !this.falsyValues.has(value)) return item;
      return item[propertyName as keyof typeof item] === value;
    })
  }

}
