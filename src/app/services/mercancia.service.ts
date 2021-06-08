import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {
  private  url:string='http://localhost:9090/api/mercancia/';

  constructor(public httClient:HttpClient) { }

  public findAll():Observable<any>{
    return this.httClient.get<any>(this.url+'findAll')
  }
}
