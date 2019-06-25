import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { EstadoCivil } from '../../../../../models/estadoCivil';
import { EstadoCivilService } from '../../services/estadoCivil.service';
import { SharedService } from 'src/app/services/shared';
@Component({
  selector: 'app-estado-civil-join',
  templateUrl: './estado-civil-join.component.html'
})
export class EstadoCivilJoinComponent implements OnInit {
  public estadoCivil: EstadoCivil;
  msgs: any[];
  constructor(private _sharedService: SharedService,
    private _estadoCivilService: EstadoCivilService) {
    this.estadoCivil = new EstadoCivil(0, '', '', '', false, '', '');

  }

  ngOnInit() {

  }
  onSubmit(form) {
    this._estadoCivilService.postEstadoCivil(this.estadoCivil).subscribe(response => {
      console.log(response);
    },
      error => {
      console.log(<any> error);
      }
    );

  }
  show(mes) {
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }

  hide() {
    this.msgs = [];
  }

}
