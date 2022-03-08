//Importamos la interface ded task para que se aplique las restricciones alli inpuestas sobre los valores de el json
import { Task } from "./task"
//Creamos un array de elementos de la lista el cual va a simular una base de datos con elementos para consumir, es decir que crearemos un json para consumir localmente
export const TASK:Task[] = [
    {
        id:1,
        text:"Compra semana",
        day:"Agosto 5 a las 12:00",
        remember:true
    },
    {
        id:2,
        text:"Estudiar para examen",
        day:"Agosto 5 a las 17:00",
        remember:true
    },
    {
        id:3,
        text:"Leer boostrap para mañana",
        day:"Agosto 5 a las 19:00",
        remember:true
    },
    {
        id:3,
        text:"Ir a sacar copias",
        day:"Agosto 5 a las 21:00",
        remember:true
    }
]