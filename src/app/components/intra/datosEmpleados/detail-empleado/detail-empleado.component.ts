import { Component, OnInit } from '@angular/core';
import { DatosEmpleado } from '../../../../models/datosEmpleado';
import { DatosEmpleadoService } from '../../../../services/datosEmpleadosService';
import { Empleado } from '../../../../models/empleado';
import { Hijo } from '../../../../models/hijo';
import { Rol } from '../../../../models/rol';
import { EmpleadoService } from '../../../../services/empleado.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RolesService } from '../../catalogos/services/roles.service';


@Component({
  selector: 'app-detail-empleado',
  templateUrl: './detail-empleado.component.html'
})
export class DetailEmpleadoComponent implements OnInit {
  empleado: Empleado;
  empleados: Empleado[];
  rol: Rol;
  roles: Rol[];
  datosEmpleado: DatosEmpleado;
  datosEmpleados: DatosEmpleado[];
  clvEmpleado: string;
  nombreCompleto: string;
  horario: any[];
  hijo: Hijo;
  nuevoHijo: Hijo;
  hijos: any;

  muestraHijos: any;
  activateHijos: boolean = false;
  display: boolean = false;
  constructor(private _empleadoService: EmpleadoService,
    private _rolService: RolesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _datosEmpleadoService: DatosEmpleadoService) {
    this.datosEmpleado = new DatosEmpleado(0, '', '', '', '', '', '', 0, [], '', '', '', '', '', '', '', '', [], '', '', '', '', false, '');
    this.hijo = new Hijo('', '', '', '', '');
  }

  ngOnInit() {
    this.hijos = '';

    this._route.params.subscribe(params => {
      this.clvEmpleado = params.clvEmpleado;
      this.getEmpleadoByClv(this.clvEmpleado);


      this.horario = [
        {
          "dia": "lunes",
          "entrada": "00:00",
          "salida": "23:59"
        },
        {
          "dia": "martes",
          "entrada": "00:00",
          "salida": "23:59"
        },
        {
          "dia": "miercoles",
          "entrada": "00:00",
          "salida": "23:59"
        },
        {
          "dia": "jueves",
          "entrada": "00:00",
          "salida": "23:59"
        },
        {
          "dia": "viernes",
          "entrada": "00:00",
          "salida": "23:59"
        },
        {
          "dia": "sabado",
          "entrada": "00:00",
          "salida": "23:59"
        },
        {
          "dia": "domingo",
          "entrada": "00:00",
          "salida": "23:59"
        }

      ]
    });

  }
  ngDoCheck() {
    if (!this.hijo.fechaNacimiento) {
      this.hijo.edad = '0';
    } else {
      this.hijo.edad = this.calcularEdad(this.hijo.fechaNacimiento);
    }


    // console.log(this.nuevoHijo);
    // if (this.hijo.fechaNacimiento != "") {
    //   this.hijo.edad = this.calcularEdad(String(this.hijo.fechaNacimiento));
    // }
    // if (this.hijos = undefined) {
    //  this.hijos =  JSON.stringify(this.nuevoHijo);
    // // console.log(this.hijos);
    // } else {
    //   this.hijos = this.hijos + ',' + JSON.stringify(this.nuevoHijo);
    //   // console.log(this.hijos);
    // }






    // if (this.hijo.fechaNacimiento) {
    //   this.hijo.edad = this.calcularEdad(this.hijo.fechaNacimiento);


    // }


  }
  getEmpleadoByClv(clv) {
    this._empleadoService.getEmpleadoByClv(clv).subscribe(response => {
      this.empleado = response;
      // this.nombreCompleto = 
      this.datosEmpleado.nombreCompleto = this.empleado.nombre + ' ' + this.empleado.apellidoPaterno + ' ' + this.empleado.apellidoMaterno;
      this.datosEmpleado.fechaIngreso = this.empleado.fechaCreacion;
      this.datosEmpleado.clvEmpleado = this.empleado.clvEmpleado;


    },
      error => {
        console.log(<any>error);

      }
    );
  }
  agregarDatos(form) {
    this.hijos = '[' + this.hijos + ']';
    this.datosEmpleado = form.value;
    this.datosEmpleado.hijos = JSON.parse(this.hijos);
    this.datosEmpleado.horario = this.horario;
    // console.log(this.datosEmpleado);
    this._datosEmpleadoService.create(form.value, this.datosEmpleado.clvEmpleado).subscribe(res => {
      console.log(res);
      this._router.navigate(['/intra/empleados']);
    },
      error => {
        console.log(error);
      });
  }

  integrarHijo(hijo) {

    console.log(hijo);
    console.log(this.muestraHijos);
    console.log(this.muestraHijos);
    if (!this.muestraHijos) {
      this.muestraHijos = JSON.stringify(this.muestraHijos);
      this.muestraHijos = JSON.stringify(hijo);
      //  this.muestraHijos.push(hijo);


      // console.log(JSON.parse(this.muestraHijos));
    }
    else {
      this.muestraHijos = JSON.stringify(this.muestraHijos);
      console.log(this.muestraHijos);
      this.muestraHijos = this.muestraHijos.replace('[', '');
      this.muestraHijos = this.muestraHijos.replace(']', '');
      console.log(this.muestraHijos);

      this.muestraHijos = this.muestraHijos + ',' + hijo;
      this.muestraHijos = JSON.parse('[' + this.muestraHijos + ']');
      console.log(this.muestraHijos);

    }
    this.muestraHijos = JSON.parse('[' + this.muestraHijos + ']');
    console.log(this.muestraHijos);

  }
  agregarHijo(form) {
    // this.nuevoHijo = null;
    this.hijo = form.value;
    this.nuevoHijo = this.hijo;
    // console.log(this.nuevoHijo);
    if (this.hijos === '') {
      this.hijos = JSON.stringify(this.nuevoHijo);
    } else {
      this.hijos = this.hijos + ',' + JSON.stringify(this.nuevoHijo);
    }
    this.integrarHijo(this.hijos);
    // this.muestraHijos = JSON.parse(this.hijos);
    // console.log(this.hijos);
    this.hijo.nombre = '';
    this.hijo.fechaNacimiento = '';
    this.hijo.edad = '';
    this.hijo.genero = '';
    this.hijo.clvEmpleado = this.datosEmpleado.clvEmpleado;
    this.display = false;
    this.activateHijos = true;


  }
  showDialog() {
    this.display = true;
  }
  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return String(edad);
  }


}