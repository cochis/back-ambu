import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../../../models/rol';
import { RolesService } from '../../services/roles.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-roles-permisos',
  templateUrl: './roles-permisos.component.html'
})
export class RolesPermisosComponent implements OnInit {
  public rol: Rol;
  public clvRol: String;
  permisos: any;
  apermisos: any;
  jsonCompleto: any;

  selectedCities: string[] = [];
  selectedCategories: string[] = ['Technology', 'Sports'];
  checked: boolean = false;


  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _rolesService: RolesService) {
    this.rol = new Rol(0, '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.clvRol = params.clvRol;
      console.log(this.clvRol);

     
      this._rolesService.getRolByClvRol(this.clvRol).subscribe(response => {
        console.log(response);
        this.rol = response;
        this.apermisos = response.permisos;
       this.apermisos = JSON.parse(this.apermisos);
        this.permisos = this.apermisos.permisos;
        this.jsonCompleto = response.permisos;
        // this.permisos = this.apermisos;
        // this.permisos = this.permisos.permisos;
        // console.log(this.permisos.administrativo.empleados.create);
        // this.permisos = JSON.parse(this.permisos.permisos);
        // console.log("2");
        // this.permisos= JSON.parse(this.permisos.permisos);
        // console.log(this.permisos);
      },
        error => {
          console.log(<any>error);
        });


    });
  }
  onSubmit(permisos){
    // console.log( JSON.parse(this.jsonCompleto));
    this.jsonCompleto = JSON.parse(this.jsonCompleto);
    console.log(permisos);
    this.jsonCompleto.permisos = permisos;

  console.log(this.jsonCompleto.permisos);
      this.rol.permisos= JSON.stringify(this.jsonCompleto);
  
    this._rolesService.updateRol(this.rol.clvRol, this.rol).subscribe(data=>{
      console.log(data);
      this._router.navigate(['/intra/catalogos/roles']);
    },
    error=> {
      console.log(<any>error);
    });

    

  }
}

// console.log(this.empleado.rolEmpleado);
// this._rolesService.getRolByClvRol(this.empleado.rolEmpleado).subscribe(data => {
// this.permisos = JSON.parse(data.permisos);
// this.permisos = JSON.parse(this.permisos.permisos);
// this.permisos = this.permisos.permisos;
// console.log(this.permisos);