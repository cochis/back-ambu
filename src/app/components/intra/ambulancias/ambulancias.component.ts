import { Component, OnInit } from '@angular/core';
import { Ambulancia } from '../../../models/ambulancia';
import { AmbulanciasService } from '../../../services/ambulanciasService';
import { SharedService } from '../../../services/shared';

@Component({
  selector: 'app-ambulancias',
  templateUrl: './ambulancias.component.html'
})
export class AmbulanciasComponent implements OnInit {
  window: any;
  ambulancia: Ambulancia;
  ambulancias: Ambulancia[];
  selectedAmbulancias: Ambulancia[];
  cols: any[];
  permisos: any;
  desAct: Boolean = false;
  cambio: any;
  constructor( private _ambulanciasService: AmbulanciasService,
               private _sharedService: SharedService) { }

  ngOnInit() {
    this.window = window.scroll(0, 0);
    this._ambulanciasService.getAmbulancias().subscribe(data=> {
      this.ambulancias = data;
      console.log(this.ambulancias);
    },
    error=> {
      console.log(<any>error);
    });
    this.cols = [
      { field: 'idAmbulancia', header: 'Id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'clvAmbulancia', header: 'C Clave de ambulancia' },
      { field: 'placa', header: 'Placa' },
      { field: 'numeroEconomico', header: 'Numero economico' },
      { field: 'marca', header: 'Marca' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'activo', header: 'Activo' },
      { field: 'ultimaActualizacion', header: 'Ultima Actualizacion' },
      { field: 'fechaCreacion', header: 'fecha de creacion' }
    ];
    
  }
  ngOnChanges() {
    
    this._ambulanciasService.getAmbulancias().subscribe(data => {
      // console.log(data);
      this.ambulancias = data;
    },
      err => {
        console.log(<any>err);
      });
    

  }
  cambiarEstado(cambio) {
    this.desAct = false;
    if (cambio.estado) {
      this._ambulanciasService.activate(cambio.clvAmbulancia, cambio.ambulancia).subscribe(data => {
        this.ngOnChanges();
      },
        error => {
          console.log(<any>error);
        });

    } else {
      this._ambulanciasService.desactivate(cambio.clvAmbulancia, cambio.ambulancia).subscribe(data => {
        this.ngOnChanges();
      },
        error => {
          console.log(<any>error);
        });
    }

  }
  desactivar(estado,clvAmbulancia,ambulancia) {
    this.cambio = { 'estado': estado,
                    'clvAmbulancia' : clvAmbulancia,
                    'ambulancia': ambulancia};

   
    // console.log(estado + '  ' + clvEmpleado);
    this.desAct = true;



  }

}
