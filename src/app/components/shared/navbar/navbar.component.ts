import { Router, ActivatedRoute, Params } from '@angular/router'
import { Empleado } from '../../../models/empleado';
import { EmpleadoService } from '../../../services/empleado.service';
import { LoginEmpleadoService } from '../../../services/loginEmpleadosService';
import { OnInit, Component } from '@angular/core';
import { SharedService } from '../../../services/shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public logueado: boolean;
  public empleado: Empleado;
  public res: any;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _empleadoService: EmpleadoService,
              private _loginService: LoginEmpleadoService,
              private _sharedService: SharedService) {
    this.empleado = new Empleado(0, '', '', '', '', '', '', '', '', false, '', '', '','');
    this.logueado = false;

  }
  ngOnInit() {
    // console.log('inicia nav');

    this.empleado = this._sharedService.getLocal('empleado');
    // console.log('empelado getLocal');
    // console.log(this.empleado);
    this.getLocal();
  }
  ngDoCheck() {
    this.getLocal();
  }

  getLocal() {
    // console.log('entra a getlocala');
    this.empleado = this._sharedService.getLocal('empleado');
    // console.log(this.empleado);
    if (!this.empleado) {
      this.logueado = false;
    } else {
      this.logueado = true;
    }
    // console.log('El usuario esta    ' + this.logueado);
  }
  logout() {

    // console.log('saliendo de log');
    // console.log('imprime empleado antes de salr');
    // console.log(this.empleado);
    this._loginService.closeLogin(this.empleado).subscribe(res => {
      this.empleado = null;
      localStorage.clear();
      sessionStorage.clear();
      // console.log('imprime logout');

      // console.log(res);
      this._router.navigate(['/home']);
    },
      err => {
        // console.log('err');
        console.log(err);
      });
  }
}
