import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mercancia } from '../../domains/Mercancia';
import { MercanciaService } from '../../services/mercancia.service';
import { ProductoService } from '../../services/producto.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mercancias',
  templateUrl: './mercancias.component.html',
  styleUrls: ['./mercancias.component.css']
})
export class MercanciasComponent implements OnInit {
  currentPage: number = 1;
  arrMercancia: any[] = new Array<any>();
  formCrearMercancia: FormGroup;
  mercancia : Mercancia
  buscar:string ='';
  validar:boolean=false;
  mercanciaModal:Mercancia;
  arrProducto:any[] = new Array<any>();
  arrUsuario:any[]= new Array<any>();
  precio:number=0;

  constructor( public modal: NgbModal,
    private fb: FormBuilder,
    private mercanciaService:MercanciaService,
    private productosService:ProductoService,
    private usuarioService:UsuariosService) {
      this.createForm();
      this.loadFormData();
      this.createListeners();
  
     }

  ngOnInit(): void {
    this.mercancia = new Mercancia(
      null,
      null,
      null,
      null,
      null,
      null,
      null     
    );
    this.obtenerMercancias()
    this.obtenerProductos()
    this.obtenerUsuarios()
  }
  obtenerMercancias(): void {
    this.mercanciaService.findAll().subscribe((resp)=>{
      this.arrMercancia= resp;
    })
      }
    obtenerProductos():void{
      this.productosService.finAllProductos().subscribe((resp)=>{
        this.arrProducto=resp
      })
    }
   obtenerUsuarios():void{
     this.usuarioService.findAll().subscribe((resp)=>{
       this.arrUsuario =resp
     })
   }
  // Método para crear formulario
  createForm() {
    this.formCrearMercancia = this.fb.group({
      inputName:['',[Validators.required]],
      inputProducto:['',[Validators.required]],
      inputUsuario:['',[Validators.required]],
      inputFechaIngreso:['',[Validators.required]],
      inputCantidad:['',[Validators.required]]
    });
  } 
  // Método para cargar data por defecto en el formulario
  loadFormData() {
    this.formCrearMercancia.reset({
      inputName:'',
      inputProducto:'',
      inputUsuario:'',
      inputFechaIngreso:'',
      inputCantidad:''     
    });    
  }
  // Método para estar pendiente de los cambios en el HTMl es como un ngModel
  createListeners() {
    this.formCrearMercancia.valueChanges.subscribe((value) => {
      this.mercancia.nombre =value.inputName
      this.mercancia.productoId =value.inputProducto
      this.mercancia.usuarioId =value.inputUsuario      
      this.mercancia.fechaIngreso =value.inputFechaIngreso
      this.mercancia.cantidad =value.inputCantidad
    });
  }
  get inputNameInvalid() {
    return (
      this.formCrearMercancia.get('inputName').invalid &&
      this.formCrearMercancia.get('inputName').touched
    );
  }
  get inputProductoInvalid() {
    return (
      this.formCrearMercancia.get('inputProducto').invalid &&
      this.formCrearMercancia.get('inputProducto').touched
    );
  }
  get inputUsuarioInvalid() {
    return (
      this.formCrearMercancia.get('inputUsuario').invalid &&
      this.formCrearMercancia.get('inputUsuario').touched
    );
  }
  get inputFechaIngresoInvalid() {
    return (
      this.formCrearMercancia.get('inputFechaIngreso').invalid &&
      this.formCrearMercancia.get('inputFechaIngreso').touched
    );
  }
  get inputCantidadInvalid() {
    return (
      this.formCrearMercancia.get('inputCantidad').invalid &&
      this.formCrearMercancia.get('inputCantidad').touched
    );
  }
  buscarMercancia(){

  }
  limpiar(){
    this.loadFormData()
    return Object.values(this.formCrearMercancia.controls).forEach(control =>{
      control.markAsUntouched();
    })
  }
  editarModalMercancia(){
    this.mercanciaService.update(this.mercanciaModal).subscribe((resp)=>{
      Swal.fire({
        icon: 'success',
        title: 'Editado',
        text: 'Editado',
      });
      this.modal.dismissAll()     
    })
    
      
  }
  //Abri el modal centrado
  openCentrado(contain, mercancia: Mercancia) {
    this.mercanciaModal = mercancia;   
    //Abrir modal
    this.modal.open(contain, { centered: true });
  }
  modalCrearMercancia(inputName,inputProducto,inputUsuario,inputFechaIngreso,inputCantidad):void{
    if(this.formCrearMercancia.invalid){    
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete todos los datos',
      });      
      return Object.values(this.formCrearMercancia.controls).forEach(control =>{
        control.markAsTouched();
      })
    }else{
      this.mercancia.nombre =inputName;
      this.mercancia.productoId=inputProducto;
      this.mercancia.usuarioId=inputUsuario;
      this.mercancia.fechaIngreso=inputFechaIngreso;
      this.mercancia.cantidad=inputCantidad;
      this.mercancia.mercanciaId=0;
      this.arrProducto.forEach(pro=>{
        if(pro.productoId==inputProducto){
          this.precio= pro.precio
        }       
      }) 
      this.mercancia.total=(inputCantidad*this.precio)  
      this.mercanciaService.save(this.mercancia).subscribe((resp)=>{
        Swal.fire({
          icon: 'success',
          title: 'Completado',
          text: 'Completado',
        });
        this.modal.dismissAll()   
        this.obtenerMercancias();   
      })
     
    }
  }
  
}
