import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../../../services/global';
import { SharedService } from 'src/app/services/shared';
import { Rol } from '../../../../models/rol';

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
    updateRol(clvRol, rol): Observable<any> {

      
      const clv = clvRol;
      const params = JSON.stringify(rol);
      var token = this._sharedService.getLocal('token');
      var headers = new HttpHeaders().set('Authorization', token);
      const slide = 'roles/' + clv;
      return this._http.put(this.url + slide, rol, { headers: headers });
    }
  // : Observable<any> 
  getRoles(): Observable<any> {
    // const params = JSON.stringify(contacto);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'roles/';
    return this._http.get(this.url + slide, { headers: headers });
  }
  getRolByClvRol(clvRol): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'roles/' + clvRol;
    return  this._http.get(this.url + slide, { headers: headers });
  }
  postRol(rol): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'roles/';
    return this._http.post(this.url + slide, rol, { headers: headers });
}
  
}
