import { Component, OnInit } from '@angular/core';
import { DatosEmpleado } from 'src/app/models/datosEmpleado';
import { Empleado } from '../../../../models/empleado';
import { Rol } from '../../../../models/rol';
import { EmpleadoService } from '../../../../services/empleado.service';
import { RolesService } from '../../catalogos/services/roles.service';
import { DatosEmpleadoService } from '../../../../services/datosEmpleadosService';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html'
})
export class DatosEmpleadoComponent implements OnInit {
  index: number = -1;
  cols: any[];
  rolByClv: any;
  yearFilter: number;
  yearTimeout: any;
  empleados: Empleado[];
  empleado: Empleado;
  datosEmpleado: DatosEmpleado;
  busqueda: DatosEmpleado;
  datosEmpleados: DatosEmpleado[];
  selectedDatosEmpleados: Empleado[];
  hora: any[];
  rol: Rol;
  roles: Rol[];
  displayEditar: Boolean = false;
  displayMostrar: Boolean = false;
  displayEstado: Boolean = false;
  dtUs: Boolean = false;
  loading: number = 0;
  dtsUsuario: Empleado;
  displayFamilia: boolean = false;
  displayLegal: boolean = false;
  displayDomicilio: boolean = false;
  displaySalud: boolean = false;
  constructor(private _empleadoService: EmpleadoService,
    private _datosEmpleadoService: DatosEmpleadoService,
    private _rolService: RolesService) { }

  ngOnInit() {
    this._datosEmpleadoService.getDatosEmpleados().subscribe(data => {
      this.datosEmpleados = data;

      // this.hora = JSON.stringify(data.horario);
    },
      err => {
        console.log(<any>err);
      });
    this.cols = [
      { field: 'idDatosEmpleado', header: 'Id' },
      { field: 'clvEmpleado', header: 'Clave de empleado' },
      { field: 'nombreCompleto', header: 'Nombre' },
      { field: 'fechaIngreso', header: 'Fecha de ingreso' },
      { field: 'clinicaImss', header: 'Clinica IMSS' },
      { field: 'rfc', header: 'RFC' },
      { field: 'puesto', header: 'Puesto' },
      { field: 'sueldo', header: 'Sueldo' },
      { field: 'horario', header: 'Horario' },
      { field: 'curp', header: 'Curp' },
      { field: 'nss', header: 'NSS' },
      { field: 'telefonoCasa', header: 'Telefono Local' },
      { field: 'telefonoMovil', header: 'Telefono Movil' },
      { field: 'tipoSangre', header: 'Tipo de Sangre' },
      { field: 'alergias', header: 'Alergias' },
      { field: 'domicilio', header: 'Domicilio' },
      { field: 'estadoCivil', header: 'Estado Civil' },
      { field: 'hijos', header: 'Hijos' },
      { field: 'nombrePadre', header: 'Nombre de Padre' },
      { field: 'nombreMadre', header: 'Nombre de Madre' },
      { field: 'UltimaActualizacion', header: 'Ultima Actualizacion' },
      { field: 'activo', header: 'Activo' },
      { field: 'genero', header: 'Genero' },
      { field: 'fechaCreacion', header: 'Fecha de creación' },
    ];

  }
  openNext() {
    this.index = (this.index === 5) ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = (this.index <= 0) ? 5 : this.index - 1;
  }
  showSalud(empleado) {
    console.log(empleado);
    this._datosEmpleadoService.getEmpleadoByClv(empleado).subscribe(data=> {
    console.log(data);
    this.busqueda = data;
    });
    this.displaySalud = true;
  }
  showLegal(empleado) {
    console.log(empleado);
    this._datosEmpleadoService.getEmpleadoByClv(empleado).subscribe(data=> {
      console.log(data);
      this.busqueda = data;
      });
    this.displayLegal = true;
  }
  showDomicilio(empleado) {
    console.log(empleado);
    this._datosEmpleadoService.getEmpleadoByClv(empleado).subscribe(data=> {
      console.log(data);
      this.busqueda = data;
      });
    this.displayDomicilio = true;
  }
  showFamilia(empleado) {
    console.log(empleado);
    this._datosEmpleadoService.getEmpleadoByClv(empleado).subscribe(data=> {
      console.log(data);
      this.busqueda = data;
      });
    this.displayFamilia = true;
  }

}
