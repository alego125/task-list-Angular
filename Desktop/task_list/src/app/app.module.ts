import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Importamos el modulo de angular commons, y luego mas abajo en imports agregamos HttpClientModule
import { HttpClient, HttpClientModule } from '@angular/common/http';

//Importamos el formModule para trabajar con los componentes referidos a formularios
import { FormsModule } from '@angular/forms';

//Importamos los modulos de routing para hacer los enrutamientos
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksItemComponent } from './components/tasks-item/tasks-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AboutComponent } from './components/about/about.component';

//Definimos las rutas donde primero le decirmos que si el path es vacio entonces nos lleve al componente task component es decir si la ruta veine vacia nos lleva al task component
//Definimos la ruta que nos lleva al componente about donde esta la informacion de nuestra aplicacion
const appRoutes: Routes = [
  {path: '', component:TasksComponent},
  {path: 'about', component:AboutComponent}
]

//En imports importamos el RouterModule y mediante el metodo forRoot le indicamos appRoutes y le activamos en true el enabletraicing para el historial de rutas
@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    ButtonComponent,
    TasksComponent,
    TasksItemComponent,
    AddTaskComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
