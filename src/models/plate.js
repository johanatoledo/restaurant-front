

export class Plate{
  constructor(nombre,descripcion,precio,categoria,ingredientes,imagen){
   this.nombre=nombre
   this.descripcion=descripcion
   this.precio=precio
   this.imagen=imagen
  

   if(categoria ==='Peruano'){
    this.categoria='Plato Peruano'
   }else if(categoria ==='Venezolano'){
     this.categoria='Plato Venezolano'
   }else if (categoria ==='Entrada Venezolana'){
    this.categoria='Entrada Venezolana'
   }else if (categoria ==='Entrada Peruana'){
    this.categoria='Entrada Peruana'
   }

   if(Array.isArray(ingredientes)){
    this.ingredientes=ingredientes
   }else{
    console.log('Introduzca un array valido de instancias')
   }
  }
  toString(){
     return `Nombre del plato:${this.nombre}\n 
     Descripcion del plato: ${this.descripcion}\n
      Precio: ${this.precio}\n
      Categoria: ${this.categoria}\n
      Ingredientes:${this.ingredientes.map(i => i.nombre).join(', ')}`
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
