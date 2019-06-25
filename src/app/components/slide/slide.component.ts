import { Component, OnInit, DoCheck } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { SharedService } from '../../services/shared';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html'
})
export class SlideComponent implements OnInit {
  public empleado: Empleado;
  public logueado: boolean;
  constructor(private _sharedService: SharedService) {
    
  }

  ngOnInit() {

  }
  ngDoCheck() {
  }
}
