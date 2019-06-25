import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Rol } from '../../../../../models/rol';
import { SharedService } from '../../../../../services/shared';
import { Empleado } from '../../../../../models/empleado';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  window: any;
  empleado: Empleado;
  rol: Rol;
  roles: Rol[];
  selectedRoles: Rol[];
  cols: any[];
  permisos: any;

  constructor(private _rolService: RolesService,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this.window = window.scroll(0, 0);
    this.empleado = this._sharedService.getLocal('empleado');
    this._rolService.getRolByClvRol(this.empleado.rolEmpleado).subscribe(data => {
      this.permisos = JSON.parse(data.permisos);
      this.permisos = this.permisos.permisos;
      // console.log(this.permisos);

      this._rolService.getRoles().subscribe(response => {
        this.roles = response;
        for (var i = 0; i < this.roles.length; i++) {
          this.permisos[i] = JSON.stringify(this.roles[i].permisos);
        }
      },
        error => {
          console.log(<any>error);

        });
    },
      error => {
        console.log(<any>error)
      });




    this.cols = [
      { field: 'idRol', header: 'Id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'clvRol', header: 'Clave' },
      { field: 'activo', header: 'Activo' },
      { field: 'permisos', header: 'Permisos' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'ultimaActualizacion', header: 'Ultima Modificacion' }
    ];
  }

}
