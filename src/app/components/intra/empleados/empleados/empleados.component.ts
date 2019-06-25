import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../models/empleado';
import { Rol } from '../../../../models/rol';
import { EmpleadoService } from '../../../../services/empleado.service';
import { RolesService } from '../../catalogos/services/roles.service';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent implements OnInit  {
  cols: any[];
  rolByClv: any;
  yearFilter: number;
  yearTimeout: any;
  empleados: Empleado[];
  empleado: Empleado;
  selectedEmpleados: Empleado[];
  rol: Rol;
  roles: Rol[];
  displayEditar: Boolean = false;
  displayMostrar: Boolean = false;
  displayEstado: Boolean = false;
  dtUs: Boolean = false;
  loading: number = 0;
  dtsUsuario:  Empleado;
  desAct: Boolean = false;
  cambio: any;
  constructor(private _empleadoService: EmpleadoService,
    private _rolService: RolesService) { 
      this.dtsUsuario = new Empleado(0, '', '', '', '', '', '', '', '', false, '', '', '','');
    }

  ngOnInit() {
    this._empleadoService.getEmpleados().subscribe(data => {
      // console.log(data);
      this.empleados = data;
      for (var i = 0; i < data.length; i++) {
        this.rolByClv = this.getRol(this.empleados[i]);


      }
    },
      err => {
        console.log(<any>err);
      });

   
    this.cols = [
      { field: 'idEmpleado', header: 'Id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellidoPaterno', header: 'Apellido PAterno' },
      { field: 'apellidoMaterno', header: 'Apellido Materno' },
      { field: 'clvEmpleado', header: 'Clave de empleado' },
      { field: 'correoEmpleado', header: 'Correo electronico' },
      { field: 'usuario', header: 'Usuario' },
      { field: 'password', header: 'Password' },
      { field: 'rolEmpleado', header: 'Rol' },
      { field: 'fechaCreacion', header: 'fecha de creacion' },
      { field: 'activo', header: 'Activo' },
      { field: 'fechaSalida', header: 'Fecha de salida' },
      { field: 'ultimaActualizacion', header: 'Ultima actualizacion' },
      { field: 'ultimaModificacion', header: 'Ultimo quien modifico' }
  ];
  }
  ngOnChanges() {
    var empleadoRol;
    this._empleadoService.getEmpleados().subscribe(data => {
      // console.log(data);
      this.empleados = data;
      for (var i = 0; i < data.length; i++) {
        this.rolByClv = this.getRol(this.empleados[i]);


      }
      this._empleadoService.getEmpleados().subscribe(data => {
        this.empleados = data;
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < this.empleados.length; i++) {
          this.rolByClv = this.getRol(this.empleados[i]);
  
  
        }
      });
    },
      err => {
        console.log(<any>err);
      });
    

  }

  getRol(empleado) {
    
    this._rolService.getRolByClvRol(empleado.rolEmpleado).subscribe(data => {
      for (var i = 0; i < this.empleados.length; i++) {
        if (empleado.idEmpleado == this.empleados[i].idEmpleado) {
          this.empleados[i].rolEmpleado = data.nombre;
          break;

        }
      }


    });
  }
  editarEmpleado() {
    //   this._empleadoService.getEmpleadoByClv().subscribe(data => {
    //     this.empleado = data;
    //     console.log(data);
    //   });

    //   console.log('entro a editar');
    // this.displayEditar = true;
  }
  mostrarEmpleado() {
    this.displayMostrar = true;

  }
  estadoEmpleado() {
    this.displayEstado = true;
  }
  cambiarEstado(cambio) {
    this.desAct = false;

    if (cambio.estado) {
      this._empleadoService.activate(cambio.clvEmpleado, cambio.empleado).subscribe(data => {
        this.ngOnChanges();
        
      },
        error => {
          console.log(<any>error);
        });

    } else {
      this._empleadoService.desactivate(cambio.clvEmpleado, cambio.empleado).subscribe(data => {
        this.ngOnChanges();
      },
        error => {
          console.log(<any>error);
        });
    }
  }
  datosUsuario(rowData) {
    this.dtUs = true;
    this.dtsUsuario = rowData;

  }
  updateUsuario(form) {
    // console.log(form.value);

  }
  desactivar(estado,clvEmpleado,empleado) {
    this.cambio = { 'estado': estado,
                    'clvEmpleado' : clvEmpleado,
                    'empleado': empleado};

    console.log(this.cambio);
    // console.log(estado + '  ' + clvEmpleado);
    this.desAct = true;



  }
  

}
