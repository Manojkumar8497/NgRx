import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/model/todo.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  isDisabled: boolean = false;
  filterChange = new Subject<number>();
  @ViewChild('title') title: ElementRef;

  constructor(private todoService: TodoService) { }

  addTodo(title: string) {
    if (title) {
      this.isDisabled = true;
      const randomNum = Math.floor(Math.random() * 1000);
      const todo: Todo = {
        id: randomNum,
        title,
        completed: false
      }
      this.onLoading();
      // Send the todo data to todoService
      this.todoService.post(todo).subscribe(
        () => {
          this.title.nativeElement.value = "";
          this.isDisabled = false;
        },
        err => {
          console.log(err.message);
        });
    }
  }

  OnFilterChange(value: number) {
    this.onLoading();
    this.todoService.filterTodos(value);
  }

  onLoading() {
    this.todoService.isLoadingChanged.next();
  }

  ngOnInit(): void {

  }

}
