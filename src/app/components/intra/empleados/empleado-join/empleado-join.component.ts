import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Empleado } from '../../../../models/empleado';
import { EmpleadoService } from '../../../../services/empleado.service';
import { RolesService } from '../../catalogos/services/roles.service';
import { Rol } from '../../../../models/rol';
import { SharedService } from '../../../../services/shared';

@Component({
  selector: 'app-empleado-join',
  templateUrl: './empleado-join.component.html'
})
export class EmpleadoJoinComponent implements OnInit {
  public empleado: Empleado;
  rol: Rol;
  roles: Rol[];
  msgs: any[];
  ingresar: Boolean = false;
  constructor(private _empleadoService: EmpleadoService,
    private _rolesService: RolesService,
    private _sharedService: SharedService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.empleado = new Empleado(0, '', '', '', '', '', '', '', '', false, '', '', '', '');
    this.rol = new Rol(0, '', '', '', '', '', '', '');
    // this.value= new Confirmacion('',false);
  }

  ngOnInit() {

    this.empleado.clvEmpleado = this.obtenerClave();
    this._rolesService.getRoles().subscribe(response => {
      this.roles = response;

    },
      error => {
        console.log(<any> error);
      });
  }



  obtenerClave() {
    this.rol.clvRol = 'AMD01';
    var hoy = new Date();
    var yy = hoy.getFullYear();
    var mm = hoy.getMonth() + 1;
    var year = yy.toString();
    year = year.substr(2, 4);
    var mounth = mm.toString();
    if (mounth.length == 1) {
      mounth = '0' + mounth;
    }
    var clvR = this.rol.clvRol.substr(0, 2);

    var next = 0;
    var rdm = this._sharedService.ramdom();
    var busqueda = year + mounth + clvR + rdm.toUpperCase();

    return busqueda;

  }
  onSubmit(empleado) {
    console.log(empleado);
    this._empleadoService.create(empleado).subscribe(data => {
      console.log(data);
      if (data.error) {
        this.ingresar = false;
       
        console.log(data.error);
        // this.show(data.error);
      } else {
        this._router.navigate(['/intra/empleados']);
      }

    });
  }
  show(mes) {
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }

  hide() {
    this.msgs = [];
  }
  confirmacion() {
    this.ingresar = true;

  }


}

