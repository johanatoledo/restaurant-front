//clase para ingredientes
export class FoodItem {
  constructor(nombre, calorias, vegano, gluten, citrico) {
    this.nombre = nombre;
    this.calorias = calorias;
    this.esVegano = vegano;
    this.contieneGluten = gluten;
    this.esCitrico = citrico;
  }

  toString() {
    return `Ingrediente: ${this.nombre}, Calorías: ${this.calorias}, Vegano: ${this.esVegano}, Gluten: ${this.contieneGluten}, Cítrico: ${this.esCitrico}`;
  }
}

