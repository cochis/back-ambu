import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { LoginEmpleado } from '../../models/loginEmpleado';
import { LoginEmpleadoService } from '../../services/loginEmpleadosService';
import { SharedService } from '../../services/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public status: string;
  public empleado: Empleado;
  public loginEmpleado: LoginEmpleado;
  public message: string;
  public token: any;
  public statusValidate: number;
  public sessionDisplay: Boolean = false;
  public error: any;
  public res: any;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _empleadoService: EmpleadoService,
    private _loginService: LoginEmpleadoService,
    private _authGuard: AuthGuardService,
    private _sharedService: SharedService) {
    this.empleado = new Empleado(0, '', '', '', '', '', '', '', '', false, '', '', '','');
    this.loginEmpleado = new LoginEmpleado(0, '', '', '', '');
  }


  ngOnInit() {
  }
  onSubmit(form): any {
    this._empleadoService.login(form.value).subscribe(
      res => {
        this.res = res;
        if (this.res.error) {
          this.sessionDisplay = true;
          this.status = 'failed';
        } else {
          this.empleado = this.res;
          this._loginService.create(this.res).subscribe(res => {
            this.res = res;
            if (!this.res.error) {
              this._loginService.getByClv(this.empleado.clvEmpleado).subscribe(res => {
                this.res = res;
                if (!this.res.error) {
                  this._sharedService.setLocal('empleado', this.empleado);
                  this._sharedService.setLocal('token', this.res.token);
                  this._router.navigate(['/intra/home']);
                } else {
                  this.status = 'failed';
                }
              },
                err => {
                  this.status = 'failed';
                });
            }
            else {
              this.status = 'failed';
            }
          },
            err => {
              this.status = 'failed';
            });
        }
      },
      err => {
        this.status = 'failed';
      }
    );
  }
  restoreSession(empleado: Empleado) {

    this._empleadoService.restore(empleado).subscribe(res => {
      this.res = res;
      this.empleado = this.res;
      console.log(this.empleado);
      this._loginService.create(this.res[0]).subscribe(res => {
        this.sessionDisplay = false;
        let clvEmpleado = this.empleado[0].clvEmpleado;
        this._loginService.getByClv(clvEmpleado).subscribe(res => {
          this.res = res;
          console.log(res);
          if (!this.res.error) {
            this.empleado[0].sesionesActivas = 1;
            // 
            this._sharedService.setLocal('empleado', this.empleado[0]);
            this._sharedService.setLocal('token', this.res.token);
            this._router.navigate(['/intra/home']);

          } else {
            this.status = 'failed';
          }



        },
          err => {

            this.status = 'failed';

          });

      },
        err => {
          this.status = 'failed';
        });
    },
      err => {
        this.status = 'failed';
      });

  }

  backLogin() {
    this.sessionDisplay = false;
    this._router.navigate(['/home']);
  }


}
