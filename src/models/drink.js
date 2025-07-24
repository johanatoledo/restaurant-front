

export class Drink{
  constructor(nombre,descripcion,precio,categoria,ingredientes,imagen){
   this.nombre=nombre
   this.descripcion=descripcion
   this.precio=precio
   this.imagen=imagen

   if(categoria==='Cocteles'){
    this.categoria='Cocteles'
   }else if(categoria ==='Jugos Naturales'){
     this.categoria='Jugos Naturales'
   }else{
    this.categoria='Tragos'
   }

   if(Array.isArray(ingredientes)){
    this.ingredientes=ingredientes
   }else{
    console.log('Introduzca un array valido de instancias')
   }
  }
  toString(){
     return `Nombre de la bebida:${this.nombre}\n 
     Descripcion de la bebida: ${this.descripcion}\n
      Precio: ${this.precio}\n
      Categoria: ${this.categoria}\n
      Ingredientes:${this.ingredientes.map(i => i.nombre).join(', ')}\n
      Imagen: ${this.imagen}\n
      `
  }
  isVegan() {
    return this.ingredientes.every(i => i.vegan)?'Si':'No';
    

}
isGlutenFree() {
  return this.ingredientes.every(i => i.glutenFree)?'Si':'No';
}
isCitrusFree() {
  return this.ingredientes.every(i => i.citrusFree)?'Si':'No';
}
}
