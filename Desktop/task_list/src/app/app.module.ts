import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksItemComponent } from './components/tasks-item/tasks-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    ButtonComponent,
    TasksComponent,
    TasksItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
