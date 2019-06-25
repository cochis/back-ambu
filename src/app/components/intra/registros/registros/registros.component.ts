import { Component, OnInit } from '@angular/core';
import { Registro } from '../../../../models/registro';
import { SharedService } from '../../../../services/shared';
import { RegistroService } from '../../../../services/registroService.sevice';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html'
})
export class RegistrosComponent implements OnInit {
  window: any;
  registro: Registro;
  registros: Registro[];
  selectedRegistros: Registro[];
  cols: any[];
  permisos: any;
  desAct: Boolean = false;
  cambio: any;
  constructor(private _registroService: RegistroService,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this._registroService.getRegistros().subscribe(data=> {
      this.registros = data;
      console.log(this.registros);
    },
    error=> {
      console.log(<any>error);
    });
    this.cols = [
      { field: 'idRegistro', header: 'ID' },
      { field: 'clvRegistro', header: 'Registro' },
      { field: 'numeroFolio', header: 'Folio' }, 
      { field: 'fecha', header: 'Fecha' }, 
      { field: 'clvCliente', header: 'Cliente' }, 
      { field: 'nombrePaciente', header: 'Paciente' },
      { field: 'genero', header: 'Genero' },
      { field: 'edad', header: 'Edad' }, 
      { field: 'procedencia', header: 'Procedencia' },
      { field: 'destino', header: 'Destino' },
      { field: 'solicito', header: 'Solicito' },
      { field: 'clvServicio', header: 'Servicio' }, 
      { field: 'poliza', header: 'Poliza' },
      { field: 'siniestro', header: 'Siniestro' },
      { field: 'inciso', header: 'Inciso' }, 
      { field: 'reporte', header: 'Reporte' }, 
      { field: 'autorizacion', header: 'Autorizacion' }, 
      { field: 'clvEmpleados', header: 'Empleados' },
      { field: 'estado', header: 'Estado' },
      { field: 'ultimaActualizacion', header: 'Ultima actualizacion' },
      { field: 'observacion', header: 'Observaciones' },
      { field: 'ocupacion', header: 'Ocupacion' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'odometro', header: 'Odometro' },
      { field: 'llamada', header: 'Hora llamada' },
      { field: 'ambulancia', header: 'Ambulancia' }, 
      { field: 'rt', header: 'RT' }, 
      { field: 'folioPm', header: 'Folio Paramedico' },
      { field: 'personal', header: 'personal' },
      { field: 'clvMembresia', header: 'clvMembresia' },
      { field: 'diagnostico', header: 'Diagnostico' },
      { field: 'categoria', header: 'Categoria' },
      { field: 'folioFactura', header: 'Foliofactura' },
      { field: 'costo', header: 'Costo' },
      { field: 'activo', header: 'Activo' },
      { field: 'fechaCreacion', header: 'Fecha de creacion' }
    ];
  }
  ngOnChanges() {
    
    this._registroService.getRegistros().subscribe(data => {
      // console.log(data);
      this.registros = data;
    },
      err => {
        console.log(<any>err);
      });
    

  }
  cambiarEstado(cambio) {
    this.desAct = false;
    console.log(cambio);
    if (cambio.estado) {
      this._registroService.activate(cambio.clvRegistro, cambio.registro).subscribe(data => {
        this.ngOnChanges();
      },
        error => {
          console.log(<any>error);
        });

    } else {
      this._registroService.desactivate(cambio.clvRegistro, cambio.registro).subscribe(data => {
        this.ngOnChanges();
      },
        error => {
          console.log(<any>error);
        });
    }

  }
  desactivar(estado,clvRegistro,registro) {
    this.cambio = { 'estado': estado,
                    'clvRegistro' : clvRegistro,
                    'registro': registro};

    console.log(this.cambio);
    // console.log(estado + '  ' + clvEmpleado);
    this.desAct = true;



  }

}
