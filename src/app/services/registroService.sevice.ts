import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { SharedService } from './shared';
import { Registro } from '../models/registro';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  public url = Global.url;
  public logueado: boolean;
  public registro: Registro;
  public token: String;
  public registros: Registro[];
  constructor(private _http: HttpClient,
    private _sharedService: SharedService) { }
  // : Observable<any> 
  getRegistros(): Observable<any> {
    console.log('list');
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/';
    return this._http.get(this.url + slide, { headers: headers });
  }
  getRegistroByClv(clvRegistro): Observable<any> {
    // var params = JSON.stringify(empleado.rolEmpleado);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/' + clvRegistro;
    return  this._http.get(this.url + slide, { headers: headers });
  }
  getRegistroByNombre(nombre): Observable<any> {
    // var params = JSON.stringify(empleado.rolEmpleado);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/nombre/' + nombre;
    return  this._http.get(this.url + slide, { headers: headers });
  }
  
  ultimo(): Observable<any> {
   
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/busqueda/ultimo/';
    console.log(this.url + slide);
    return this._http.get(this.url + slide,{ headers: headers });
 

  }
  activate(clvRegistro, registro): Observable<any> {
    const clv = clvRegistro;
    const params = JSON.stringify(registro);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/activar/' + clvRegistro;
    return this._http.put(this.url + slide, registro, { headers: headers });
 

  }
  updateRegistro(clvRegistro, registro): Observable<any> {

      
    const clv = clvRegistro;
    const params = JSON.stringify(registro);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/' + clv;
    return this._http.put(this.url + slide, registro, { headers: headers });
  }

  desactivate(clvRegistro, registro): Observable<any> {
    const clv = clvRegistro;
    const params = JSON.stringify(registro);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/desactivar/' + clv;
    return this._http.put(this.url + slide, registro, { headers: headers });
 

  }
  postRegistro(registro): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'registro/';
    return this._http.post(this.url + slide, registro, { headers: headers });
}
}
