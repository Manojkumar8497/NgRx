import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {

  todosList: Todo[];
  filterCount: number;
  isLoading: boolean;
  todoSubscription: Subscription;
  filterSubscription: Subscription;
  loadingSubscription: Subscription;

  constructor(public todoService: TodoService) {
    this.todosList = new Array<Todo>();
    this.isLoading = true;
  }

  // To update the completed state
  updateTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.patch(todo);
  }

  // To delete a single Todo
  deleteTodo(id: number) {
    this.isLoading = true;
    this.todoService.delete(id);
  }

  ngOnInit(): void {
    // Getting the todo data
    this.todoService.get().subscribe(() => {
      this.todosList = this.todoService.getTodos();
      this.isLoading = false;
    });
    // Update the data once we recive the subject data
    this.todoSubscription = this.todoService.todosListUpdated.subscribe((todos: Todo[]) => {
      this.todosList = todos;
      this.isLoading = false;
    });
    // Update the filter count once we recive the subject data
    this.filterSubscription = this.todoService.todosLimitUpdated.subscribe((limit: number) => {
      this.filterCount = limit;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    })
    // Update the lodaing status once we recive the subject data
    this.loadingSubscription = this.todoService.isLoadingChanged.subscribe(() => {
      this.isLoading = true;
    });
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
