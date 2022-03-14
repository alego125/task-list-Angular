import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Dentro de aqui lo que hacemos es colocar las rutas que queremos que se nos rendericen 
//Si queremos redirigir a la pagina principal en caso de que la ruta no exista entonces en path colocamos ** lo que hara sera atrapar todas las rutas, en redirectTo no colocamos nada lo cual nos va a dirigir a la pagina principal, pero hay que tener cuidado ya que esta linea que atrapa todas las rutas hay que ponerla al final de todo ya que los path se ejecutan en orden si no siempre nos va a redirigir a la pagina principal cualquiera sea la ruta que coloquemos
const routes: Routes = [
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  {path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
