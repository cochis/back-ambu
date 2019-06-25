import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AmbulanciasService } from '../../../../services/ambulanciasService';
import { Ambulancia } from '../../../../models/ambulancia';

@Component({
  selector: 'app-ambulancia-detail',
  templateUrl: './ambulancia-detail.component.html'
})
export class AmbulanciaDetailComponent implements OnInit {
  public ambulancia: Ambulancia;
  public clvAmbulancia: String;
  public cambioAmbulancia: any;
  actualizar: Boolean = false;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _ambulanciasService: AmbulanciasService) {
    this.ambulancia = new Ambulancia(0, '', '', '', '', '', '', false, '', '');
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.clvAmbulancia = params.clvAmbulancia;
      this._ambulanciasService.getAmbulanciaByClv(this.clvAmbulancia).subscribe(response => {
        this.ambulancia = response;
        console.log(response);
      },
        error => {
          console.log(<any>error);
        });

    });

  }
  onSubmit(form) {
    this._ambulanciasService.updateAmbulancia(this.clvAmbulancia, this.ambulancia).subscribe(response => {
      console.log(response);
      this._router.navigate(['/intra/ambulancias']);

    },
      error => {
        console.log(<any>error);
      });
  }
  confirmacion() {
    this.actualizar = true;

  }

}
