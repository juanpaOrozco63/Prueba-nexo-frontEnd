import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private  url:string='http://localhost:9090/api/producto/';

  constructor(public httClient:HttpClient) { }

  public finAllProductos():Observable<any>{
    return this.httClient.get<any>(this.url+'findAll')

  }
}
