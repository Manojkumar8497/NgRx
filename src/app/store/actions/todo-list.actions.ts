import { Action } from '@ngrx/store';
import { Todo } from 'src/app/model/todo.model';

export const enum ActionTypes {
  GET_TODOS_START = '[Todo List] Get Todos Start',
  GET_TODOS = '[Todo List] Get Todos',
  Add_TODO_START = '[Todo List] Add Todo Start',
  ADD_TODO = '[Todo List] Add Todo',
  UPDATE_TODO_START = '[Todo List] Update Todo Start',
  UPDATE_TODO = '[Todo List] Update Todo',
  DELETE_TODO_START = '[Todo List] Delete Todo Start',
  DELETE_TODO = '[Todo List] Delete Todo',
  FILTER_TODO_START = '[Todo List] Filter Todo Start',
  FILTER_TODO = '[Todo List] Filter Todo',
  ERROR_HANDLING = '[Todo List] Error Handling',
  CLEAR_ERROR = '[Todo List] Clear Error'
}

export class GetTodosStart implements Action {
  readonly type = ActionTypes.GET_TODOS_START;
}

export class GetTodos implements Action {
  readonly type = ActionTypes.GET_TODOS;
  constructor(public payload: Todo[]) { }
}

export class AddTodoStart implements Action {
  readonly type = ActionTypes.Add_TODO_START;
  constructor(public payload: Todo) { }
}

export class AddTodo implements Action {
  readonly type = ActionTypes.ADD_TODO;
  constructor(public payload: Todo) { }
}

export class UpdateTodoStart implements Action {
  readonly type = ActionTypes.UPDATE_TODO_START;
  constructor(public payload: Todo) { }
}

export class UpdateTodo implements Action {
  readonly type = ActionTypes.UPDATE_TODO;
  constructor(public payload: Todo) { }
}

export class DeleteTodoStart implements Action {
  readonly type = ActionTypes.DELETE_TODO_START;
  constructor(public payload: number) { }
}

export class DeleteTodo implements Action {
  readonly type = ActionTypes.DELETE_TODO;
  constructor(public payload: number) { }
}

export class FilterTodoStart implements Action {
  readonly type = ActionTypes.FILTER_TODO_START;
  constructor(public payload: number) { }
}

export class FilterTodo implements Action {
  readonly type = ActionTypes.FILTER_TODO;
  constructor(public payload: number) { }
}

export class ErrorHandling implements Action {
  readonly type = ActionTypes.ERROR_HANDLING;
  constructor(public payload: string) { }
}

export class ClearError implements Action {
  readonly type = ActionTypes.CLEAR_ERROR;
}

export type ActionsUnion =
  GetTodosStart | GetTodos | AddTodoStart | AddTodo | UpdateTodoStart |
  UpdateTodo | DeleteTodoStart | DeleteTodo | ErrorHandling | ClearError |
  FilterTodoStart | FilterTodo;
