import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as TodoActions from '../store/actions/todo-list.actions';
import * as fromTodoList from '../store/todo-list.reducer';

@Component({
  selector: 'app-alert',
  template: `
  <div class="alert alert-danger" role="alert">
    {{message}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="onCloseAlert()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  `,
  styles: [
    `
    .alert-danger {
    color: #fff;
    background-color: #e74c3c;
    border-color: #e74c3c;
    }
    .close{
      color: #fff;
    }
    `
  ]
})
export class AlertComponent {
  @Input() message: string;

  constructor(private store: Store<fromTodoList.TodoState>) { }

  onCloseAlert() {
    this.store.dispatch(new TodoActions.ClearError());
  }
}
