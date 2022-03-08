import { Component, OnInit } from '@angular/core';
//Importamos la lista de tareas desde TASK para trabajar con ellas
import { TASK } from 'src/app/mock-task';
//Tambien importamos la interface para poder trabajar con ella
import { Task } from 'src/app/task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  //Guardamos en un array toda la lista de tareas que tenemos en el JSON que habiamos creado
  tasks:Task[] = TASK;
  

  constructor() { }

  ngOnInit(): void {
  }

}
