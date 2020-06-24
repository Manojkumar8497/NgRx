import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Todo } from 'src/app/model/todo.model';
import * as fromTodoList from '../../store/todo-list.reducer';
import * as TodoActions from '../../store/actions/todo-list.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  isDisabled: boolean = false;
  filterChange = new Subject<number>();
  @ViewChild('title') title: ElementRef;

  constructor(private store: Store<fromTodoList.TodoState>) { }

  onSubmit(event: Event) {
    event.preventDefault();
    const title = this.title.nativeElement.value;
    if (title) {
      const randomNum = Math.floor(Math.random() * 1000);
      const userId = Math.floor(Math.random() * 10);
      const todo: Todo = {
        id: randomNum,
        title: title,
        completed: false,
        userId: userId
      }
      this.store.dispatch(new TodoActions.AddTodoStart(todo));
    }
  }

  OnFilterChange(value: number) {
    this.store.dispatch(new TodoActions.FilterTodoStart(value));
  }

  ngOnInit(): void {
    this.store.select('todoList').subscribe((responseData: fromTodoList.State) => {
      this.isDisabled = responseData.isLoading;
    });
  }

}
