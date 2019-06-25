import { Component, OnInit } from '@angular/core';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { EstadoCivilService } from '../../services/estadoCivil.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-estado-civil-view',
  templateUrl: './estado-civil-view.component.html'
})
export class EstadoCivilViewComponent implements OnInit {
  public estadoCivil: EstadoCivil;
  public clvEstadoCivil: String;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _estadoCivilService: EstadoCivilService) {
    this.estadoCivil = new EstadoCivil(0, '', '', '', false, '', '');
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.clvEstadoCivil = params.clvEstadoCivil;
      console.log(this.clvEstadoCivil);
      this._estadoCivilService.getEstadoCivil(this.clvEstadoCivil).subscribe(response => {
        this.estadoCivil = response;
        console.log(this.estadoCivil);
      },
        error => {
          console.log(<any>error);
        });


    });
  }

}
