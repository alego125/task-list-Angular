//Realizamos el contrato es decir la interface que va a poner las reglas de los tipos de datos que se deberan usar en los campos
//Con esto nos aseguramos que cuando por ejemplo queramos modificar la cantidad de stock no podamos colocar un valor string ya que se especifico en esta interface que sera un valor de tipo numerico por lo cual deberemos colocar un numero
//Entonces podemos resumir que una interface nos va a servir para modelar datos
//Si solamente necesitamos modelar los datos usamos interfaces, para otras cosas si queremos llamar un campo y llenarlo con algun tipo de dato en especifico y cosas por el estilo usamos clases para modelar pero por lo general se utilizan interfaces para realizar el modelado
export interface Product{
    id:number;
    name:string;
    price:number;
    description:string;
    categoryId:number;
    stock:number;
}