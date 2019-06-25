import { Component, OnInit } from '@angular/core';
import { DatosEmpleado } from '../../../../models/datosEmpleado';
import { SharedService } from '../../../../services/shared';
import { DatosEmpleadoService } from '../../../../services/datosEmpleadosService';

@Component({
  selector: 'app-datos-empleados-join',
  templateUrl: './datos-empleados-join.component.html'
})
export class DatosEmpleadosJoinComponent implements OnInit {
  datosEmpleado: DatosEmpleado;
  msgs: any;
  constructor(private _sharedService: SharedService,
    private _datosEmpleadosService: DatosEmpleadoService) {
    this.datosEmpleado = new DatosEmpleado(0, '', '', '', '', '', '', 0, [], '', '', '', '', '', '', '', '', [], '', '', '', '', false, '');
  }

  ngOnInit() {
  }

  onSubmit(form) {

  }

}
