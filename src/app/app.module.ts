import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { TodosComponent } from './Components/todos/todos.component';
import { AddTodoComponent } from './Components/add-todo/add-todo.component';
import { FilterPipe } from './shared/filter.pipe';
import { todoListReducer } from './store/todo-list.reducer';
import { TodoEffects } from './store/effects/todo-list.effects';
/** Utility Components */
import { SpinnerComponent } from './shared/spinner.components';
import { AlertComponent } from './shared/alert.components';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AddTodoComponent,
    SpinnerComponent,
    FilterPipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ todoList: todoListReducer }),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
