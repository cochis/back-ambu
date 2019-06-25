import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { SharedService } from '../../../../../services/shared';
import { Rol } from '../../../../../models/rol';
import { RolesService } from '../../services/roles.service';


@Component({
  selector: 'app-roles-join',
  templateUrl: './roles-join.component.html'
})
export class RolesJoinComponent implements OnInit {
  permisos: any;
  rol: Rol;
  msgs: any[];
  constructor(private _rolesService: RolesService,
    private _sharedService: SharedService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.rol = new Rol(0, '', '', '', '', '', '', '');
  }

  ngOnInit() {
    // this.permisos = {"rol":"Paramedico","clvRol":"OPR05","tipo":"administrativo","permisos":{"administrativo":{"empleados":{"create":false,"read":false,"update":false,"delete":false},"datosEmpleados":{"create":false,"read":false,"update":false,"delete":false},"ambulancias":{"create":false,"read":false,"update":false,"delete":false},"sitios":{"create":false,"read":false,"update":false,"delete":false},"localidades":{"create":false,"read":false,"update":false,"delete":false},"catalogos":{"Roles":{"create":false,"read":false,"update":false,"delete":false},"estadoCivil":{"create":false,"read":false,"update":false,"delete":false}}},"operativo":{"servicios":{"create":false,"read":false,"update":false,"delete":false},"inventarios":{"create":false,"read":false,"update":false,"delete":false},"reportesAmbulancias":{"create":false,"read":false,"update":false,"delete":false},"registroPacientes":{"create":false,"read":false,"update":false,"delete":false}},"clientesMembresias":{"clientes":{"create":false,"read":false,"update":false,"delete":false},"membresias":{"create":false,"read":false,"update":false,"delete":false},"reportesAmbulancias":{"create":false,"read":false,"update":false,"delete":false},"registroPacientes":{"create":false,"read":false,"update":false,"delete":false}},"catalogos":{"roles":{"create":false,"read":false,"update":false,"delete":false},"estadoCivil":{"create":false,"read":false,"update":false,"delete":false}}}};
  }

  onSubmit(form) {
   
    this.rol.permisos =  JSON.stringify(this.permisos);
    console.log(this.rol);
    this._rolesService.postRol(this.rol).subscribe(data=> {
      console.log(data);
      this._router.navigate(['/intra/roles']);
    },
    error=> {
      console.log(<any>error);
    });
  }
  show(mes) {
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
  hide() {
    this.msgs = [];
  }

}
