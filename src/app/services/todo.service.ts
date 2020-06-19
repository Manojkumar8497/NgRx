import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import { Todo } from '../model/todo.model';
import { Subject } from 'rxjs';

@Injectable({
  'providedIn': 'root'
})
export class TodoService {

  readonly apiUrl: string;
  todosList: Todo[];
  todosListUpdated = new Subject<any>();
  todosLimitUpdated = new Subject<number>();
  isLoadingChanged = new Subject();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.todosList = new Array<Todo>();
  }

  // Get the todos list
  getTodos() {
    return this.todosList.slice();
  }

  // Filter the todos data based on limit
  filterTodos(limit: number) {
    this.todosLimitUpdated.next(limit);
  }

  // Fetch the data from server
  get() {
    return this.http.get(this.apiUrl).pipe(
      tap((todos: Todo[]) => {
        this.todosList = todos;
      })
    );
  }

  // Create a new todo
  post(todo: Todo) {
    this.todosList.unshift(todo);
    // Send the req to server
    return this.http.post(this.apiUrl, todo).pipe(
      tap(() => {
        // Emitting the todos data
        this.todosListUpdated.next(this.todosList.slice());
      })
    )
  }

  // Update the single todo
  patch(todo: Todo) {
    // Finding the index of todo has to be updated
    const index = this.todosList.indexOf(todo);
    this.todosList[index] = todo;
    // Send the patch req to server
    this.http.patch(`${this.apiUrl}/${todo.id}`, todo).subscribe(() => {
      // Emmiting the todo data
      this.todosListUpdated.next(this.todosList.slice());
    });
  }

  // Delete the single todo
  delete(id: number) {
    // delete the todo from the todosList
    this.todosList = this.todosList.filter(todo => todo.id != id);
    // Send the delete req to server
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      (response) => {
        // Emitting the todos data
        this.todosListUpdated.next(this.todosList.slice());
        console.log(response);
      },
      err => {
        console.log(err.message);
      });
  }

}
