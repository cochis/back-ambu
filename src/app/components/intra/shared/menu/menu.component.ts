import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Empleado } from '../../../../models/empleado';
import { SharedService } from '../../../../services/shared';
import { RolesService } from 'src/app/services/roles.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  public visible: any;
  public display: any;
  public empleado: Empleado;
  public permisos: any;
  window: any;

  constructor(private _sharedService: SharedService,
    private _rolesService: RolesService) { 
      
    }

  ngOnInit() {
    
    this.window = window.scroll(0, 0);
    this.empleado = this._sharedService.getLocal('empleado');
    this._rolesService.getRolByClvRol(this.empleado.rolEmpleado).subscribe(data => {
      this.permisos = JSON.parse(data.permisos);
      this.permisos = this.permisos.permisos;
     
    },
    error => {
      console.log(<any> error)
    });
    
  }

}