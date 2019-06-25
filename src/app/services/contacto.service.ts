import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contacto } from '../models/contacto';
import { Global } from './global';

@Injectable({
    providedIn: 'root'
  }) 
export class ContactoService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }


    sendContacto(contacto: Contacto): Observable<any> {
        const params = JSON.stringify(contacto);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const slide = 'send-contacto/';
        return this._http.post(this.url + slide , params, { headers: headers });
    }
   




}
