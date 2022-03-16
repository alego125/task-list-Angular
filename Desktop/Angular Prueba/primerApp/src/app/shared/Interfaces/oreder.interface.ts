export interface Details {
    productId:number;
    productName:string;
    quantity:string;
}

export interface Order {
    name:string;
    shippingAddres:string;
    city:string;
    date:string;
    pickup:boolean;
    id:number;
}

//Creamos una interface mas para el detalle de la orden que loq ue hace es darle estructura al acoplamiento de la orden
//La propiedad id aqui es opcional ya que si no esta creada la orden todavia no vamos a tener un id del detalle orden
export interface DetailOrder {
    details:Details[];
    orderId:number;
    id?:number;
}