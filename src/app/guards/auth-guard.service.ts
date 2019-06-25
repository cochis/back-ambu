import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';
@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate {

  constructor(private _empleadoService: EmpleadoService) { }
  canActivate() {
    if (this._empleadoService.isAutenticated()) {
      return true;
    }
    else {
      return false;
    }
  }
  
}
