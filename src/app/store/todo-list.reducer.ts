import { ActionTypes, ActionsUnion } from './actions/todo-list.actions';
import { Todo } from '../model/todo.model'

export interface State {
  todos: Todo[],
  todoError: string,
  isLoading: boolean,
  filterCount: number
}

export interface TodoState {
  todoList: State
}

const initialState: State = {
  todos: [],
  todoError: null,
  isLoading: false,
  filterCount: 200
}

export function todoListReducer(state: State = initialState, action: ActionsUnion) {
  switch (action.type) {
    // Get Todos Start
    case ActionTypes.GET_TODOS_START:
      return {
        ...state,
        todoError: null,
        isLoading: true
      }
    // Get Todos
    case ActionTypes.GET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
        todoError: null,
        isLoading: false
      }
    case ActionTypes.Add_TODO_START:
      return {
        ...state,
        todoError: null,
        isLoading: true
      }
    // Add Todo
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        todoError: null,
        isLoading: false
      };
    // Update Todo Start
    case ActionTypes.UPDATE_TODO_START:
      return {
        ...state,
        todoError: null,
        isLoading: true
      }
    // Update Todo
    case ActionTypes.UPDATE_TODO:
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      const updatedTodo = {
        ...state.todos[index],
        ...action.payload
      };
      const updatedTodos = [...state.todos];
      updatedTodos[index] = updatedTodo;
      return {
        ...state,
        todos: [...updatedTodos],
        todoError: null,
        isLoading: false
      };
    // Delete Todo Start
    case ActionTypes.DELETE_TODO_START:
      return {
        ...state,
        todoError: null,
        isLoading: true
      }
    // Delete Todo
    case ActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => {
          return todo.id !== action.payload;
        }),
        todoError: null,
        isLoading: false
      }
    // Filter Todo Start
    case ActionTypes.FILTER_TODO_START:
      return {
        ...state,
        isLoading: true
      }
    // Filter Todo
    case ActionTypes.FILTER_TODO:
      return {
        ...state,
        filterCount: action.payload,
        isLoading: false
      }
    // Error Handling
    case ActionTypes.ERROR_HANDLING:
      return {
        ...state,
        todoError: action.payload,
        isLoading: false
      }
    // Clear the error message
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        todoError: null
      }
    default:
      return state;
  }
}
