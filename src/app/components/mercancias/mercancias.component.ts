import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mercancia } from '../../domains/Mercancia';
import { MercanciaService } from '../../services/mercancia.service';

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


  constructor( public modal: NgbModal,
    private fb: FormBuilder,
    private mercanciaService:MercanciaService) {
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
  }
  obtenerMercancias(): void {
    this.mercanciaService.findAll().subscribe((resp)=>{
      this.arrMercancia= resp;
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

  }
  //Abri el modal centrado
  openCentrado(contain, mercancia: Mercancia) {
    this.mercanciaModal = mercancia;   
    //Abrir modal
    this.modal.open(contain, { centered: true });
  }
  modalCrearMercancia(){
    
  }
}
