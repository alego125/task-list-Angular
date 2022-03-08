import { Component, OnInit } from '@angular/core';

//Importamos el taskSrvice para que la tareas se puedan obtener del json de la base ded atos
import { TaskService } from 'src/app/service/task.service';

//Importamos a Task para que podamos hacer uso de esta cuando llamamos al servicio para obtener mediante el metodo get la tarea
import { Task } from 'src/app/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  //Guardamos en un array toda la lista de tareas que tenemos en el JSON que habiamos creado
  tasks:Task[] = [];
  

  //En el constructor lo que hacemos es inicializar nuestro servicio
  constructor(
    private taskService:TaskService
  ) { }

  //Aqui lo que hacemos es llamar a nuestro servicio 
  ngOnInit(): void {
    //Aca para recibir la informacion del servicio al ser la funcion getTask asincronica debemos usar una promesa mediante la funcion subscribe para obtener la informacion
    //Ahora si luego de esto las tareas estas que recibimos las asignamos a nuestra varaible tasks
    this.taskService.getTask().subscribe( tasks => [
      this.tasks = tasks
    ]);
  }

}
