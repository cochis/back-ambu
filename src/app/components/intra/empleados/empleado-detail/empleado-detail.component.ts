import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../models/empleado';
import { Rol } from '../../../../models/rol';
import { EmpleadoService } from '../../../../services/empleado.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RolesService } from '../../catalogos/services/roles.service';

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html'
})
export class EmpleadoDetailComponent implements OnInit {
  cols: any[];
  rolByClv: any;
  yearFilter: number;
  yearTimeout: any;
  empleados: Empleado[];
  empleado: Empleado;
  clvEmpleado: String;
  actualizar: Boolean = false;
  rol: Rol;
  roles: Rol[];
  displayEditar: Boolean = false;
  displayMostrar: Boolean = false;
  displayEstado: Boolean = false;
  loading: number = 0;
  constructor(private _empleadoService: EmpleadoService,
    private _rolService: RolesService,
    private _router: Router,
    private _route: ActivatedRoute) {
    // this.empleado = new Empleado ( 0, '123', '', '', '', '', '', '', '', false, '', '' );
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.clvEmpleado = params.clvEmpleado;
      
      this.getEmpleadoByClv(this.clvEmpleado);
    });
    this._rolService.getRoles().subscribe(response => {
      this.roles = response;
    },
      error => {
        console.log(<any>error);

      });

  }

  getEmpleadoByClv(clv) {
    this._empleadoService.getEmpleadoByClv(clv).subscribe(response => {
      this.empleado = response;
    },
      error => {
        console.log(<any>error);
      }
    );
  }
  onSubmit(updateForm) {
   
    this._empleadoService.updateEmpleado(this.clvEmpleado,this.empleado).subscribe(response => {
      this._router.navigate(['/intra/empleados']);
    },
    error => {
      console.log(<any>error)
    });

  }
  confirmacion() {
    this.actualizar = true;

  }

}
