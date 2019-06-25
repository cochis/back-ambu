import { Injectable } from '@angular/core';
import { HttpClient  , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Empleado } from '../models/empleado';
import { SharedService } from './shared';
import { DatosEmpleado } from '../models/datosEmpleado';
@Injectable({
  providedIn: 'root'
})
export class DatosEmpleadoService {
  public url = Global.url;
  public logueado: boolean;
  public empleado: Empleado;
  public token: String;
  public datosEmpleado: DatosEmpleado;

  constructor(private _http: HttpClient  ,
    private _sharedService: SharedService) { }
  
  getDatosEmpleados(): Observable<any> {
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders();
      var headers = new HttpHeaders().set('Authorization', token);
    const slide = 'datos-empleado/datos' ;
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
    const slide = 'empleados/busqueda/' + clv + '';
    return this._http.get(this.url + slide, { headers: headers });

  }
  create(form,clv): Observable<any> {
    // console.log('entro');
    // console.log(form);
    // form.clvEmpleado = '123456';
    // form.nombrecompleto = undefined;
    // form.fechaIngreso = undefined;
    // form.clinicaImss = undefined;
    // form.clinicaImss = undefined;
    // form.rfc = undefined;
    // form.puesto = undefined;
    // form.sueldo = undefined;
    // form.horario = undefined;
    // form.curp = undefined;
    // form.nss = undefined;
    // form.telefonoMovil = undefined;
    // form.tipoSangre = undefined;
    // form.alergias = undefined;
    // form.domicilio = undefined;
    // form.estadoCivil = undefined;
    // form.hijos = undefined;
    // form.nombrePadre = undefined;
    // form.nombreMadre = undefined;
    // form.ultimaActualizacion = undefined;
    // form.activo = undefined;
    // form.genero = undefined;
    // form.telefonoCasa = undefined;
    form.entrada1 = undefined;
    form.entrada2 = undefined;
    form.entrada3 = undefined;
    form.entrada4 = undefined;
    form.entrada5 = undefined;
    form.entrada6 = undefined;
    form.entrada7 = undefined;
    form.salida1 = undefined;
    form.salida2 = undefined;
    form.salida3 = undefined;
    form.salida4 = undefined;
    form.salida5 = undefined;
    form.salida6 = undefined;
    form.salida7 = undefined;
    form.sueldo = Number(form.sueldo);
    form.activo = true;
    // form.horario = undefined;
    // form.hijos = undefined;
    form.horario = JSON.stringify(form.horario);
    form.hijos = JSON.stringify(form.hijos);
    var token = this._sharedService.getLocal('token');
    var headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(`${this.url}datos-empleado/${clv}` , form , { headers: headers });
    

  }
}
