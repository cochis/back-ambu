import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { SharedService } from './shared';
import { Ambulancia } from '../models/ambulancia';

@Injectable({
  providedIn: 'root'
})
export class AmbulanciasService {
  public url = Global.url;
  public logueado: boolean;
  public ambulancia: Ambulancia;
  public token: String;
  public ambulancias: Ambulancia[];
  constructor(private _http: HttpClient,
    private _sharedService: SharedService) { }
  // : Observable<any> 
  getAmbulancias(): Observable<any> {
    // const params = JSON.stringify(contacto);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'ambulancias/';
    return this._http.get(this.url + slide, { headers: headers });
  }
  getAmbulanciaByClv(clvAmbulancia): Observable<any> {
    // var params = JSON.stringify(empleado.rolEmpleado);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'ambulancias/' + clvAmbulancia;
    return  this._http.get(this.url + slide, { headers: headers });
  }
  
  activate(clvAmbulancia, ambulancia): Observable<any> {
    const clv = clvAmbulancia;
    const params = JSON.stringify(ambulancia);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'ambulancias/activar/' + clv;
    return this._http.put(this.url + slide, ambulancia, { headers: headers });
 

  }
  updateAmbulancia(clvAmbulancia, ambulancia): Observable<any> {

      
    const clv = clvAmbulancia;
    const params = JSON.stringify(ambulancia);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'ambulancias/' + clv;
    return this._http.put(this.url + slide, ambulancia, { headers: headers });
  }

  desactivate(clvAmbulancia, ambulancia): Observable<any> {
    const clv = clvAmbulancia;
    const params = JSON.stringify(ambulancia);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'ambulancias/desactivar/' + clv;
    return this._http.put(this.url + slide, ambulancia, { headers: headers });
 

  }
  postAmbulancia(ambulancia): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'ambulancias/';
    return this._http.post(this.url + slide, ambulancia, { headers: headers });
}
}
