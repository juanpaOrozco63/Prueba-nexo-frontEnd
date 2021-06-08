export class Producto{
    constructor(
        public productoId:number,
        public codigo:String,
        public nombre:String,
        public detalle:String,
        public precio:number,
        public mercanciaId:number
    ){
    }
}