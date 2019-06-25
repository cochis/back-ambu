import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { AmbulanciasService } from '../../../../services/ambulanciasService';
import { SharedService } from '../../../../services/shared';
import { Ambulancia } from '../../../../models/ambulancia';

@Component({
  selector: 'app-ambulancia-join',
  templateUrl: './ambulancia-join.component.html'
})
export class AmbulanciaJoinComponent implements OnInit {
  public ambulancia: Ambulancia;
  msgs: any[];
  ingresar: Boolean = false;
  constructor(private _ambulanciasService: AmbulanciasService,
    private _sharedService: SharedService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.ambulancia = new Ambulancia(0, '', '', '', '', '', '', false, '', '');
  }

  ngOnInit() {
  }
  onSubmit(form) {
    this._ambulanciasService.postAmbulancia(this.ambulancia).subscribe(res => {
      console.log(res);
      this._router.navigate(['/intra/ambulancias']);
    },
      error => {
        console.log(<any>error);
      });


  }
  show(mes) {
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
  hide() {
    this.msgs = [];
  }
  confirmacion() {
    this.ingresar = true;

  }

}
