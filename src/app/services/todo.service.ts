import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Todo } from '../model/todo.model';

@Injectable({
  'providedIn': 'root'
})
export class TodoService {

  readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  // Fetch the data from server
  get() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Create a new todo
  post(todo: Todo) {
    return this.http.post(`${this.apiUrl}`, todo);
  }

  // Update the single todo
  patch(todo: Todo) {
    return this.http.patch(`${this.apiUrl}/${todo.id}`, todo);
  }

  // Delete the single todo
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
