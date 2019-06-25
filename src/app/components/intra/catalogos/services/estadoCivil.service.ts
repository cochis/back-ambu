import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../../../services/global';
import { SharedService } from 'src/app/services/shared';
import { EstadoCivil } from '../../../../models/estadoCivil';

@Injectable({
    providedIn: 'root'
  })
export class EstadoCivilService {
    public url = Global.url;
    public estadoCivil: EstadoCivil;
    public token: String;
    public estadosCiviles: EstadoCivil[];
    constructor(private _http: HttpClient,
        private _sharedService: SharedService) { }
    getEstadosCiviles(): Observable<any> {
        // const params = JSON.stringify(contacto);
        var token = this._sharedService.getLocal('token');
        var headers = new HttpHeaders().set('Authorization', token);
        const slide = 'estado-civil/';
        return this._http.get(this.url + slide, { headers: headers });
    }
    getEstadoCivil(clvEstadoCivil): Observable<any> {
        var token = this._sharedService.getLocal('token');
        var headers = new HttpHeaders().set('Authorization', token);
        const slide = 'estado-civil/' + clvEstadoCivil;
        return this._http.get(this.url + slide, { headers: headers });
    }

    postEstadoCivil(estadoCivil): Observable<any> {
        console.log(estadoCivil);
        var token = this._sharedService.getLocal('token');
        var headers = new HttpHeaders().set('Authorization', token);
        const slide = 'estado-civil/';
        return this._http.post(this.url + slide, estadoCivil, { headers: headers });
    }
    updateEstadoCivil(clvEstadoCivil, estadoCivil): Observable<any> {
        const clv = clvEstadoCivil;
        const params = JSON.stringify(estadoCivil);
        var token = this._sharedService.getLocal('token');
        var headers = new HttpHeaders().set('Authorization', token);
        const slide = 'estado-civil/' + clv;
        return this._http.put(this.url + slide, estadoCivil, { headers: headers });
    }
    desactivarEstadoCivil(clvEstadoCivil): Observable<any> {
        const clv = clvEstadoCivil;
        var token = this._sharedService.getLocal('token');
        var headers = new HttpHeaders().set('Authorization', token);
        const slide = 'estado-civil/desactivar/' + clv;
        return this._http.delete(this.url + slide, { headers: headers });
    }
    activarEstadoCivil(clvEstadoCivil): Observable<any> {
        const clv = clvEstadoCivil;
        var token = this._sharedService.getLocal('token');
        var headers = new HttpHeaders().set('Authorization', token);
        const slide = 'estado-civil/activar/' + clv;
        return this._http.put(this.url + slide, { headers: headers });
    }




}
