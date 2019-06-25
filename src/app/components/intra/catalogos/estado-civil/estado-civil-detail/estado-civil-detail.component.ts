import { Component, OnInit } from '@angular/core';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { EstadoCivilService } from '../../services/estadoCivil.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-estado-civil-detail',
  templateUrl: './estado-civil-detail.component.html'
})
export class EstadoCivilDetailComponent implements OnInit {
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
  onSubmit(form) {
    console.log(form.value);
    this._estadoCivilService.updateEstadoCivil(this.clvEstadoCivil, this.estadoCivil).subscribe(response => {
      this._router.navigate(['/intra/catalogos/estado-civil']);
    },
      error => {
        console.log(<any>error)
      });
  }

}
