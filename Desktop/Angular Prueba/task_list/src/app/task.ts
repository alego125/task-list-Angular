//Para indicar las restricciones del Json lo que hacemos es asignar cada atributo dentro de una interface y colocarle el tipo que se va a usar o sea le estamos restringiendo el tipo de datos que usara desde la interface
export interface Task{
    id?:number; //Puede que venga con id o no si es que ya se guardo si no se guardo no tendremos un id todavia generado
    text:string;
    day:string;
    reminder:boolean;
}