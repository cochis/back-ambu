import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Rol } from '../models/rol';
import { SharedService } from './shared';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public url = Global.url;
  public logueado: boolean;
  public rol: Rol;
  public token: String;
  public roles: Rol[];
  constructor(private _http: HttpClient,
    private _sharedService: SharedService) { }
  // : Observable<any> 
  getRoles(): Observable<any> {
    // const params = JSON.stringify(contacto);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'roles/';
    return this._http.get(this.url + slide, { headers: headers });
  }
  getRolByClvRol(clvRol): Observable<any> {
    // var params = JSON.stringify(empleado.rolEmpleado);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'roles/' + clvRol;
    console.log('entro');
    console.log(this.url + slide);
    return  this._http.get(this.url + slide, { headers: headers });
  }
}
