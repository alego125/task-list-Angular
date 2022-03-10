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

  //Creamos la funcion que se encargara de eliminar la tarea especificada
  deleteTask(task:Task){
    //La eliminacion se hace en realdad a traves del servicio 
    //Aca lo que hacemos es medainte el subscribe realizar un filtrado para buscar la tarea que se esta liminando y quitarla de la lista 
    this.taskService.deleteTask(task)
      .subscribe(()=>{
      //Filtramos los id de la lista de tareas y delvolvemos todos aquellos que tengan un id diferente a los de la tarea que borramos es decir al id de task
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    })
    //Hasta aqui lo que sucede es que en service se borra la tarea de la base de datos y cuando vuelve esa respuesta de la base de datos simplemente tomamos nuestra lista de tareas que ya esta guardada en nuestra instancia de task y hacemos un filter para quitar de la lista instanciada aquella tarea que tiene el id igual a la tarea que se borro de la base de datos
  }

  //Esto solamente modifica el mock del front pero la base de datos queda sin alterar para eso hay que irse al servicio y realizar tambien el cambio alli cuando se hace click
  //Creamos la funcion toggleRemider para realizar la accion de iterar entre true y false la propiedad de la base ded atos o json reminder
  toggleReminder(task:Task){
    //Aca lo que hacemos es invertir el valor actual de la propiedad reminder y reasignarle ese valor invertido nuevamente es decir que si estaba en true pasa a false y vicebersa
    task.reminder = !task.reminder
    //Una vez cambiada la propiedad de la tarea reminder de el archivo mock entonces lo que hacemos es hacer el envio de esta a nuestro servicio para que este se encargue de cambiarlo tambien en la base de datos json, al final debemos colocar el subscribe debemos recordar esto ya que estamos trabajando con una peticion a la base de datos
    this.taskService.updateTaskReminder(task).subscribe();
    //A esto le llamamos mersintiendo la informacion 
  }

  //Creamos el metodo el cual recibe la tarea del evento como un elemento del tipo Task
  addTask(task:Task){
    //Ahora una vez recibida la tarea lo que hacemos es eviarsela al servicio el cual nos va a permitir guardar dicha tarea
    //Llamamos al servicio y le pasamos la tarea que queremos guaradar, y mediante el metodo subscribe va a devolver la tarea recien creada, y en subscribe lo que debemos hacer es meter en el array de tareas tasks del componente este
    this.taskService.addTask(task).subscribe(task => {
      this.tasks.push(task)
    });
  }

}
