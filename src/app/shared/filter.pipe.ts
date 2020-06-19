import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.model';

@Pipe({
  name: 'todoFilter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Todo[], todoCounts: number): any {
    if (value.length <= 0) {
      return value;
    }
    return value.slice(0, todoCounts);
  }
}
