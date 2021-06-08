export class Mercancia{
    constructor(
        public mercanciaId:number,
        public cantidad:number,
        public fechaIngreso:Date,
        public nombre:String,
        public total:number,
        public productoId:number,
        public usuarioId:number
    ){
    }
}