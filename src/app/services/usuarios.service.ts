import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private  url:string='http://localhost:9090/api/usuario/';

  constructor(public httClient:HttpClient) { }

  public findAll():Observable<any>{
    return this.httClient.get<any>(this.url+'findAll')

  }
}
