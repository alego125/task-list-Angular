import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Details, Order } from 'src/app/shared/Interfaces/oreder.interface';
import { Store } from 'src/app/shared/Interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  //Creamos el objeto model con sus propiedades para ser usadas en el form
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };

  //Creamos la propiedad de cart la cual tendra un array de productos
  cart: Product[] = [];

  //Creamos la propiedad isDelivery que sera booleana y servira para saber si medainte el radiobutton se selecciona delivery o retiro por store
  isDelivery: boolean = true;

  stores: Store[] = []

  //Importamos el data service que se encarga de recuperar la informacion de los stores disponibles
  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productSvc: ProductsService
  ) {
    //Ahora llamamos al metodo checkIfCartIsEmpty aqui dentro del contructor para que cuando queramos ir al checkout sin haber seleccionado ningun producto, es decir cuando el array de cart este vacio entonces no nos deje ingresar a products y nos vuelva a products
    this.checkIfCartIsEmpty()
  }

  ngOnInit(): void {
    //Llamamos al metodo getStores en este metodo para que al iniciarse el modulo con la clase automaticamente se llame el metodo y se traigan los stores
    this.getStores();
    //Llamamos la propiedad getDataCart al iniciar el metodo para que al arrancar la pagina nos aseguremos que nuestra propiedad cart tenga la informacion que deseamos
    this.getDataCart();
  }

  //Creamos el metodo para el cambio en los radio buttons
  onPickupOrDelivery(value: boolean): void {
    //Hacemos que la propiedad isDelivery sea igual al valor recibido como parametro que es el valor que trae el radiobutton
    this.isDelivery = value;
  }

  //Creamos el metodo que se encarga de gestionar el submit del formulario, el mismo recibe un valor que es el formulario, hacemos un destructuring para el formulario diciendo que sera de tipo ngForm y el value sera de nombre formData por lo que usamos formData ahora
  onSubmit({ value: formData }: NgForm): void {
    //Primero recuperamos los valores del formulario
    console.log("Guardar", formData);
    //Creamos una variable que contendra toda la data de nuestro formulario, ademas de date, pickup la cual tendremos que setearla con la propiedad isDelivery ya sea true o false y la fecha la vamos a recuperar mediante le metodo date de javascript
    const data: Order = {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery
    }

    //Seguidamente llamamos al metodo saveOrder del service y le pasamos la orden que no es mas que la informacion de la variable data de arriba, ademas como es un observable debemos usar el pipe y ademas subscribirnos mediante subscribe
    //En el pipe lo que hacemos es primero con el operador tap mostramos la informacion de la orden guardada en consola para ver lo que se guardo y luego usamos el operador switchMap para guardar la onformacion de la orden en el detalle details
    this.dataSvc.saveOrder(data)
      .pipe(
        tap(res => console.log('Order ->', res)),
        switchMap(({ id: orderId }) => {
          //Mediante destructuring recuperamos el id en el parametro arriba y lo renombramos como orderId asi de esta manera nos ahorramos el tener que declarar otra variable para esto si no que directamente la conseguimos con el parametro en la funcion

          //MAndamos a llamar el id y los detalles y los asignamos a sus correspondientes variables, las cuales luego usamos para pasar al metodo de guardar detalle de order o saveDetailsOrder 
          const details = this.prepareDetails();
          return this.dataSvc.saveDetailsOrder({ details, orderId });
        }
        ),
        tap(() => {
          //Ahora lo que hacemos con este tap es medainte router y el metodo navegate es pasarle una ruta hacia la cual nos va a redirigir una vez que el pedido haya sido realizado
          this.router.navigate(['/checkout/thank-you-page'])
          //Luego de esto hacemos un delay de 2 segundos mediante el metodo delay para que no se resetee al instante el carrito si no que espere dos segundos y luego se resetee        
        }),
        delay(2000),
        tap(() => this.shoppingCartSvc.resetCart())


      )
      .subscribe();
  }



  //Creamos el metodo getStores que se encarga de recuperar los stores desde el service
  private getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      )
      .subscribe();
  }

  //Metodo para recuperar la fecha del pedido
  private getCurrentDate(): string {
    //Retornamos la fecha y con tolocaledatestring convertimos esa fecha actual en formato de fecha local y en string
    return new Date().toLocaleDateString();
  }


  //Creamos un metodo para gestionar el manejo de details
  private prepareDetails(): Details[] {
    const details: Details[] = [];
    //Aca lo que hacemos es recorrer nuestro carrito de compras para sacar los details de estos, para esto usaremos un for each
    this.cart.forEach((product: Product) => {
      //Vamos a crear las variables sigueintes (mediante destructuring de Javascript) que seran extraidas de los productos es decir que de todas las propiedades de un producto solo vamos a necesitar las siguientes (el stock lo creamos tambien para luego poder mas adelante poder calcular la cantidad restante de stock que tenemos)
      //Le vamos a hacer una reasignacion de nombres mediante dos puntos : y luego el nuevo nombre por ejemplo id:productId el id ahora pasa a ser productId. El unico que queda igual es el stock
      const { id: productId, name: productName, qty: quantity, stock } = product;

      //Creamos una variable que almacene el valor de el stock restante luego de hacer un pedido, y este valor luego lo enviamos hacia nuestra api para actualizar dicho stock del producto
      //ACLARAMOS QUE ESTO DE ACTUALIZAR LAS CANTIDADES ES MANEJO QUE TIENE QUE HACER EL BACKEND NO ES RESPONSABILIDAD DEL FRON
      const updateStock = (stock - quantity);

      //Ahora lo que hacemos es a traves del service de product usamos el metodo update stock y a este le pasamos los parametros de id del producto a actualizar asi como tambien el nuevo stock que es el calculo de aca arriba updateStock
      this.productSvc.updateStock(productId, updateStock)
        .pipe()
        .subscribe();
      //Le pasamos a details mediante un push las sigueintes propiedades, esto lo hacemos dentro del pipe una vez se actualiza el stock del producto
      details.push({ productId, productName, quantity });
    })


    //Nos devuelve el array de details en el cual tendriamos las 3 propiedades mostradas arriba
    return details;

  }

  //Creamos un metodo para subscribirnos al observable y recuperar la data de details de los productos del carrito y colocarlos dentro de la propiedad de tipo array cart para esta luego usarla para el metodo de arriba prepareDetails
  private getDataCart(): void {
    //LLamamos al observable cartAction y en este usamos el metodo pipe y el metodo subscribe, con el metodo pipe lo que hacemos es recuperar los productos y asignarlos a la propiedad cart
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe()

  }

  //Creamos un metodo para redireccionar en el caso de que nuestro shopping cart no tenga productos
  private checkIfCartIsEmpty(): void {
    //Este lo que debe hacer es subscribirse al cartservice que es un observable
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {
          //Aqui dentro ahora lo que vamoa a comprobar es que si el array esta vacio entonces vamos a redirigir a la pagina de productos
          //Mediante un if comprobamos si es un array y no tiene lenght entonces esta vacio y lo que hacemos es rediccionar mediante el metodo navigate hacia la pagina de productos
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products'])
          }
        })
      )
      .subscribe();
  }

}
