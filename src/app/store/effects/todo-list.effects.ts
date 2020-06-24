import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as TodoActions from '../actions/todo-list.actions';
import { Todo } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/services/todo.service';

// Custom Error Message
const errorMessage = (error: any) => {
  let errorMessage = 'An unknown error occured!'
  switch (error.status) {
    case 404:
      errorMessage = 'Not found';
      break;
    case 500:
      errorMessage = 'Internal Server Error';
      break;
    default:
      errorMessage = 'Something went wrong, Please try again';
      break;
  }
  return of(new TodoActions.ErrorHandling(errorMessage));
}

@Injectable()
export class TodoEffects {

  // Get todo effect
  @Effect()
  getTodo = this.actions$.pipe(
    ofType(TodoActions.ActionTypes.GET_TODOS_START),
    switchMap(() => {
      return this.todoService.get().pipe(
        map((resData: Todo[]) => {
          return new TodoActions.GetTodos(resData);
        }),
        catchError((error) => {
          return errorMessage(error);
        })
      )
    })
  );

  // Add new todo effect
  @Effect()
  addTodo = this.actions$.pipe(
    ofType(TodoActions.ActionTypes.Add_TODO_START),
    switchMap((todoData: TodoActions.AddTodoStart) => {
      return this.todoService.post(todoData.payload).pipe(
        map((resData: Todo) => {
          return new TodoActions.AddTodo(resData);
        }),
        catchError(error => {
          return errorMessage(error);
        })
      )
    })
  );

  // Update todo
  @Effect()
  updateTodo = this.actions$.pipe(
    ofType(TodoActions.ActionTypes.UPDATE_TODO_START),
    switchMap((todoData: TodoActions.UpdateTodoStart) => {
      return this.todoService.patch(todoData.payload).pipe(
        map((todo: Todo) => {
          return new TodoActions.UpdateTodo(todo);
        }),
        catchError(error => {
          return errorMessage(error);
        })
      );
    })
  );

  // Delete todo
  @Effect()
  deleteTodo = this.actions$.pipe(
    ofType(TodoActions.ActionTypes.DELETE_TODO_START),
    switchMap((todoData: TodoActions.DeleteTodoStart) => {
      return this.todoService.delete(todoData.payload).pipe(
        map(() => {
          return new TodoActions.DeleteTodo(todoData.payload)
        }),
        catchError(error => {
          return errorMessage(error);
        })
      )
    })
  );

  // Filtering Todo
  @Effect()
  filterTodo = this.actions$.pipe(
    ofType(TodoActions.ActionTypes.FILTER_TODO_START),
    switchMap((filterCount: TodoActions.FilterTodoStart) => {
      return of(new TodoActions.FilterTodo(filterCount.payload));
    })
  );

  constructor(private actions$: Actions, private todoService: TodoService) { }

}
