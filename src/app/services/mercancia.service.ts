import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { Mercancia } from '../models/Mercancia';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {
  private  url:string='http://localhost:9090/api/mercancia/';

  constructor(public httClient:HttpClient) { }

  public findAll():Observable<any>{
    return this.httClient.get<any>(this.url+'findAll')
  }
  public save(mercancia:Mercancia):Observable<any>{
    return this.httClient.post<any>(this.url+'save',mercancia).pipe(
      catchError(e=>{
        Swal.fire('Error',e.error.error[0],'error');
        console.error(e);
         return throwError(e);
      })
    );
  }
  public update(mercancia:Mercancia):Observable<any>{
    return this.httClient.post<any>(this.url+'update',mercancia).pipe(
      catchError(e=>{
        Swal.fire('Error',e.error.error[0],'error');
        console.error(e);
         return throwError(e);
      })
    );
  }

  
}
