import { Component, OnInit, DoCheck } from '@angular/core';
import { SharedService } from './services/shared';
import { Empleado } from './models/empleado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Ambulancias Humanas';
  logueado: Boolean;
  empleado:Empleado;
  constructor(private _sharedService: SharedService) {
    this.empleado = new Empleado(0, '', '', '', '', '', '', '', '', false, '', '', '','');
  }

  ngOnInit() {
  this.empleado = this._sharedService.getLocal('empleado');
  }
  ngDoCheck() {
    this.empleado = this._sharedService.getLocal('empleado');
    this.getLocal();
// console.log(this.empleado);

  }
  getLocal() {


    if (this.empleado) {
      return this.logueado = true;
    } else {
      return this.logueado = false;
    }


  }

}
