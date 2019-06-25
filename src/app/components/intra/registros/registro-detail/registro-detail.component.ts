import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Registro } from '../../../../models/registro';
import { RegistroService } from '../../../../services/registroService.sevice';
import { SharedService } from '../../../../services/shared';
import { Empleado } from '../../../../models/empleado';
import { EmpleadoService } from '../../../../services/empleado.service';
import { AmbulanciasService } from '../../../../services/ambulanciasService';
import { Ambulancia } from '../../../../models/ambulancia';

@Component({
  selector: 'app-registro-detail',
  templateUrl: './registro-detail.component.html'
})
export class RegistroDetailComponent implements OnInit {
  public registro: Registro;
  public empleado: Empleado;
  public empleados: Empleado[];
  public ambulancia: Ambulancia;
  public ambulancias: Ambulancia[];
  public clvegistro: any;
  public momentoActual = new Date();
  public hora: any;
  public minuto: any;
  public segundo: any;
  public horaImprimible: any;
  public horaSalida: any;
  actualizar: Boolean = false;
  public aig: boolean = false;
  public ama: boolean = false;
  public atl: boolean = false;
  public gmm: boolean = false;
  public bxc: boolean = false;
  public clb: boolean = false;
  public hbm: boolean = false;
  public mmb: boolean = false;
  public mlt: boolean = false;
  public prt: boolean = false;
  public hpd: boolean = false;
  public wtc: boolean = false;
  public clvRegistro: any;



  msgs: any[];
  constructor(private _registroService: RegistroService,
    private _sharedService: SharedService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _empleadoService: EmpleadoService,
    private _ambulanciasService: AmbulanciasService) {
    // tslint:disable-next-line: max-line-length
    this.registro = new Registro(0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', false, '');
    this.empleado = new Empleado(0, '', '', '', '', '', '', '', '', false, '', '', '', '');
  }

  ngOnInit() {
   
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data;
      console.log(this.empleados);
      this._ambulanciasService.getAmbulancias().subscribe(data => {
        this.ambulancias = data;
        this._route.params.subscribe(params => {
          this.clvRegistro = params.clvRegistro;
          console.log(this.clvRegistro);
          this._registroService.getRegistroByClv(this.clvRegistro).subscribe(response => {
            this.registro = response;
            console.log(this.registro);
            
          },
            error => {
              console.log(<any>error);
            }); 
        });
      });;
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges() {
    if (this.registro.clvCliente == 'AIG-01') {
      this.aig = true;
    } else {
      this.aig = false;
    }
    if (this.registro.clvCliente == 'AMA-02') {
      this.ama = true;
    } else {
      this.ama = false;
    }
    if (this.registro.clvCliente == 'ATL-03') {
      this.atl = true;
    } else {
      this.atl = false;
    }
    if (this.registro.clvCliente == 'AGM-04') {
      this.gmm = true;
    } else {
      this.gmm = false;
    }
    if (this.registro.clvCliente == 'BXC-05') {
      this.bxc = true;
    } else {
      this.bxc = false;
    }
    if (this.registro.clvCliente == 'CLA-06') {
      this.clb = true;
    } else {
      this.clb = false;
    }
    if (this.registro.clvCliente == 'HBM-07') {
      this.hbm = true;
    } else {
      this.hbm = false;
    }
    if (this.registro.clvCliente == 'MBS-08') {
      this.mmb = true;
    } else {
      this.mmb = false;
    }
    if (this.registro.clvCliente == 'MLT-09') {
      this.mlt = true;
    } else {
      this.mlt = false;
    }
    if (this.registro.clvCliente == 'PTC-10') {
      this.prt = true;
    } else {
      this.prt = false;
    }
    if (this.registro.clvCliente == 'HPD-11') {
      this.hpd = true;
    } else {
      this.hpd = false;
    }
    if (this.registro.clvCliente == 'WTC-12') {
      this.wtc = true;
    } else {
      this.wtc = false;
    }
  }
  onSubmit(form) {
    console.log(this.registro);
    this._registroService.updateRegistro(this.registro.clvRegistro,this.registro).subscribe(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        // this.show(data.error);
      } else {
        this._router.navigate(['/intra/registros']);
      }

    });
  }
  show(mes) {
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }

  hide() {
    this.msgs = [];
  }
  

  mueveReloj() {
    this.momentoActual = new Date()
    this.hora = this.momentoActual.getHours()
    this.minuto = this.momentoActual.getMinutes()
    this.segundo = this.momentoActual.getSeconds()
    this.horaImprimible = this.hora + " : " + this.minuto + " : " + this.segundo
    console.log(this.horaImprimible);

  }
  confirmacion() {
    this.actualizar = true;

  }

}
