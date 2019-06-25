import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../models/empleado';
import { Rol } from '../../../../models/rol';
import { EmpleadoService } from '../../../../services/empleado.service';
import { RolesService } from '../../catalogos/services/roles.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-empleado-view',
  templateUrl: './empleado-view.component.html'
})
export class EmpleadoViewComponent implements OnInit {
  cols: any[];
  rolByClv: any;
  yearFilter: number;
  yearTimeout: any;
  empleados: Empleado[];
  empleado: Empleado;
  clvEmpleado: String;
  rol: Rol;
  roles: Rol[];
  displayEditar: Boolean = false;
  displayMostrar: Boolean = false;
  displayEstado: Boolean = false;
  loading: number = 0;
  constructor(private _empleadoService: EmpleadoService,
    private _rolService: RolesService,
    private _router: Router,
    private _route: ActivatedRoute){ }

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

}
