import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../../../models/rol';
import { RolesService } from '../../services/roles.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-roles-detail',
  templateUrl: './roles-detail.component.html'
})
export class RolesDetailComponent implements OnInit {
  public rol: Rol;
  public clvRol:String;
  public cambioRol: any;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
     private _rolesService: RolesService) {
    this.rol = new Rol(0, '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.clvRol = params.clvRol;
      console.log(this.clvRol);
      this._rolesService.getRolByClvRol(this.clvRol).subscribe( response => {
        this.rol = response;
        console.log(this.rol.permisos);
       

      },
      error => {
  console.log(<any> error);
      });
      
      
    });
  }
  onSubmit(updateForm) {
    console.log(updateForm.value);
    this.cambioRol = JSON.parse(this.rol.permisos);
    this.cambioRol.rol = this.rol.nombre;
    this.cambioRol.clvRol = this.rol.clvRol;
    this.rol.permisos = JSON.stringify(this.cambioRol);
    console.log(this.cambioRol.rol);

    this._rolesService.updateRol(this.clvRol,this.rol ).subscribe(response => {
     
      console.log(response);
      this._router.navigate(['/intra/catalogos/roles']);
    },
    error => {
      console.log(<any>error)
    });
    
  }

}
