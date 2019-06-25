import { Component, OnInit } from '@angular/core';
import { EstadoCivilService } from '../../services/estadoCivil.service';
import { EstadoCivil } from '../../../../../models/estadoCivil';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html'
})
export class EstadoCivilComponent implements OnInit {
  estadoCivil: EstadoCivil;
  estadosCiviles: EstadoCivil[];
  selectedEstados: EstadoCivil[];
  cols: any[];
  permisos =  [];


  constructor(private _estadoCivilService: EstadoCivilService) { }

  ngOnInit() {
    this._estadoCivilService.getEstadosCiviles().subscribe(res=> {
      this.estadosCiviles = res;
      console.log(this.estadosCiviles);

    },
    error => {
      console.log(<any>error);
    });
    this.cols = [
      { field: 'idEstadoCivil', header: 'Id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'clvEstadoCivil', header: 'Clave' },
      { field: 'activo', header: 'Activo' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'ultimaActualizacion', header: 'Ultima Modificacion' }
  ];
  }

}
