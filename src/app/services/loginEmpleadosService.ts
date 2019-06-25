import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { LoginEmpleado } from '../models/loginEmpleado';
import { __values } from 'tslib';
import { SharedService } from './shared';
import { Empleado } from '../models/empleado';
@Injectable({
  providedIn: 'root'
})
export class LoginEmpleadoService {
  public url = Global.url;
  public logueado: boolean;
  public loginEmpleado: LoginEmpleado;
  public token: String;

  constructor(private _http: HttpClient,
    private _sharedService: SharedService) { }

  getById(id) {
    var headers = new HttpHeaders();
    const slide = 'login/id/' + id;
    return this._http.get(this.url + slide, { headers });

  }
  getByClv(clv) {
    var headers = new HttpHeaders();
    const slide = 'login/clv/' + clv;
    return this._http.get(this.url + slide, { headers });

  }

  create(empleado) {
    return this._http.post(`${this.url}login/`, empleado);
  }
  update(empleado) {
      return this._http.put(`${this.url}login/actualizar/${empleado.idEmpleado}`, empleado);
  }
  closeLogin(empleado) {
    // console.log(empleado);
    return this._http.post(`${this.url}login/closeLogin/${empleado.clvEmpleado}`, empleado);
}

  

}
