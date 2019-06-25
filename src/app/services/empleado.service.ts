import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Empleado } from '../models/empleado';
import { SharedService } from './shared';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  public url = Global.url;
  public logueado: boolean;
  public empleado: Empleado;
  public token: String;

  constructor(private _http: HttpClient,
    private _sharedService: SharedService) { }
  login(empleado: any) {
    return this._http.post(`${this.url}empleados/login`, empleado);
  }
  restore(empleado: any) {
    return this._http.post(`${this.url}empleados/restore/`, empleado);
  }

  returnToken(empleado: any) {
    return this._http.post(`${this.url}empleados/loginToken`, empleado);
  }

  isAutenticated() {
    this.empleado = this._sharedService.getLocal('empleado');
    if (!this.empleado) {
      return false;
    }
    this.token = this._sharedService.getLocal('token');
    if (!this.token) {
      return false;
    }
    return true;
  }
  getEmpleados(): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders();
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'empleados/emple';
    return this._http.get(this.url + slide, { headers });
  }
  getEmpleadoByClv(clv): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'empleados/' + clv + ' ';
    return this._http.get(this.url + slide, { headers: headers });
  }
  updateEmpleado(clvEmpleado, empleado): Observable<any> {
    const clv = clvEmpleado;
    const params = JSON.stringify(empleado);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'empleados/' + clv;
    return this._http.put(this.url + slide, empleado, { headers: headers });
  }
  saveToken(clvEmpleado, empleado): Observable<any> {
    const clv = clvEmpleado;
    const params = JSON.stringify(empleado);
    var token = this._sharedService.getLocal('token');
    empleado.token = token;
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'empleados/token/' + clv;
    return this._http.put(this.url + slide, empleado, { headers: headers });
  }
  activate(clvEmpleado, empleado): Observable<any> {
    const clv = clvEmpleado;
    empleado.rolEmpleado = undefined;
    const params = JSON.stringify(empleado);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'empleados/activar/' + clv;
    this.empleado = this._sharedService.getLocal('empleado');
    if (this.empleado) {
      empleado.ultimaModificacion = this.empleado.clvEmpleado;
      return this._http.put(this.url + slide, empleado, { headers: headers });
    }

  }

  desactivate(clvEmpleado, empleado): Observable<any> {
    const clv = clvEmpleado;
    empleado.rolEmpleado = undefined;
    const params = JSON.stringify(empleado);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'empleados/desactivar/' + clv;
    if (this.empleado) {
      empleado.ultimaModificacion = this.empleado.clvEmpleado;
      return this._http.put(this.url + slide, empleado, { headers: headers });
    }

  }
  getClave(clv): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'empleados/busqueda/' + clv + ' ';
    return this._http.get(this.url + slide, { headers: headers });

  }
  create(form): Observable<any> {
    
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(`${this.url}empleados`, form);


  }
 
}
