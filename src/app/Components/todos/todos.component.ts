import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Todo } from 'src/app/model/todo.model';
// Reducer & Actions
import * as fromTodoList from '../../store/todo-list.reducer';
import * as TodoActions from '../../store/actions/todo-list.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {

  todosList: Todo[];
  filterCount: number;
  isLoading: boolean = false;
  errorMessage: string = null;
  storeSub: Subscription;

  constructor(private store: Store<fromTodoList.TodoState>) {
    this.todosList = new Array<Todo>();
  }

  // Tod get the todos data
  getTodos() {
    this.store.dispatch(new TodoActions.GetTodosStart());

    this.storeSub = this.store.select('todoList').subscribe((response: fromTodoList.State) => {
      this.todosList = response.todos;
      this.isLoading = response.isLoading;
      this.errorMessage = response.todoError;
      this.filterCount = response.filterCount;
    })
  }

  // To update the completed state
  updateTodo(todo: Todo) {
    const updatedTodo: Todo = {
      userId: todo.userId,
      id: todo.id,
      title: todo.title,
      completed: !todo.completed
    };
    this.store.dispatch(new TodoActions.UpdateTodoStart(updatedTodo));
  }

  // To delete a single Todo
  deleteTodo(id: number) {
    this.store.dispatch(new TodoActions.DeleteTodoStart(id));
  }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
