import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  //Primero creamos un array de productos que se va tipar mediante la interface de Product y lo inicializamos como un array vacio, en este array sera donde se vayan guardando todos los productos que se vayan guardando al carrito
  products: Product[] = [];

  //Creamos una nueva instancia de subject que sera de tipo array de product. Este tipo Subject ademas de ser un observable tambien es un observador
  //Creamos 3 instancias de Subject una para los elementos del carrito otra para el total que lleva gastado el cliente y otra para la catidad de productos que lleva el cliente, en estos dos ultimos el observable de tipo subject sera de tipo numerico en estos casos
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  constructor() { }
  //Seguidamente lo que haremos sera devolver estos observables hacia los o el elemento que necesite consumirlos, para esto usaremos un getter

  //Cuando trabajamos con observables por convencion se le agrega al final un signo de $
  get totalAction$(): Observable<number> {
    //Con esto estamos devolviendo el observable del totalsubject creado mas arriba, esto mismo lo hacemos con los otros 3 subjects
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }


  //CReamos el sigueinte metodo publico, este no es mas que un metodo intermedio que se encargara de hacer el llamado de los metodo mas abajo creados privados es decir con este metodo iniciamos todos los metodos
  udateCart(product: Product): void {
    this.addToCart(product);
    this.quantityProduct();
    this.calcTotal();
  }

  //Creamos un metodo para resetear los observables
  resetCart():void{
    //De esta manera llamando al metodo next le pasamos nuevamente los valores por defecto que tenian los observables cuando los definimos arriba, con esto ahora cuando hagamos un pedido el carrito automaticamente se resetea, pero para esto debemos hacer la llamada de este metodo al final del metodo de la orden
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    //Tambien debemos vaciar el array de productos que se va llenando de procutos
    this.products = [];
  }

  //Ahora creamos un metodo que se encargara de realizar el calculo de el total de los productos del cliente, este metodo sera privado y no devolvera nada
  private calcTotal(): void {
    //Creamos una variable total que contendra el total que lo calculamos medinte el metodo reduce el cual recibe una callback primero y luego el producto luego vamos sumando cada precio del producto y lo vamos asignando a la call back para que devuelva el total calculado de todos los productos y lo asigne a la variable total. Ademas este metodo reduce tiene un tercer parametro que es el valor inicial que en este caso sera cero
    //Para el calculo del total debemos realizar una multiplicacion del precio del producto por la cantidad de productos para que se calcule correctamente el total
    const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
    //Ahora una vez que tengamos el total lo que debemos hacer es pasarle ese valor a nuestro observable, es decir al observable de total, para esto llamamos a totalSubject y con este al metodo next con el cual le pasamos el total para que lo almacene
    this.totalSubject.next(total);

  }
  //El siguiente metodo vamos a extraer la cantidad de productos que el usuario haya añadido al carrito
  private quantityProduct(): void {
    //Creamos la variable que nos dira la cantidad de productos que tenemos para esto usaremos el metodo lenght para saber la longitud de elemento que tenemos en products que seramn los productos que tenga el carrito de nuestro cliente
    //Usamos el metodo reduce solo con qty para solamente nos cuente la contidad de productos
    const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
    //De igual manera que con los demos observables mediante el metodo next guardamos la cantidad
    this.quantitySubject.next(quantity);
  }
  //Tambien necesitamos el metodo addToCart que lo que hara es recibir un producto por parametro para colocar en el carrito 
  private addToCart(product: Product): void {

    //Mediante la siguiente variable vamos a buscar dentro de productos que estan en el carrito para ver si el producto a agregar ya se encuentra en el mismo para eso usamos el metodo find y dentro de este mediante destructuring vemos si el id esta dentro del array. Esto lo hacemos para que a la hora de agregar un nuevo producto al carrito en la tabla resumen de checkout no nos aparezca duplicado el producto si no que nos aparezca todo junto y con el subtotal del mismo
    const isProductInCart = this.products.find(({ id }) => id === product.id)

    //Ahora mediante un if lo que hacemos es lo sigueinte
    if (isProductInCart) {
      //Si tiene el producto entonces lo que hacemos como la variable que creamos contiene a productos y este tiene la propiedad qty entonces simplemente aumentamos en 1 la cantidad de ese producto 
      isProductInCart.qty += 1;
    } else {
      //En caso de que el producto no lo tenga entonces lo que hacemos es mediante un push agregar ese producto y concatenarle la propiedad de qty con el valor de 1 que es el producto en si la cantidad que teine ahora es 1
      this.products.push({ ...product, qty: 1 });
    }

    //Tambien lo notificamos a nuestro observable usando el metodo next
    this.cartSubject.next(this.products);
  }


}
