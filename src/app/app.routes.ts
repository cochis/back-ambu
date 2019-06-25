
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/intra/inicio/inicio.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { EmpleadosComponent } from './components/intra/empleados/empleados/empleados.component';
import { EmpleadoDetailComponent } from './components/intra/empleados/empleado-detail/empleado-detail.component';
import { EmpleadoViewComponent } from './components/intra/empleados/empleado-view/empleado-view.component';
import { EmpleadoJoinComponent } from './components/intra/empleados/empleado-join/empleado-join.component';
import { RolesComponent } from './components/intra/catalogos/roles/roles/roles.component';
import { RolesDetailComponent } from './components/intra/catalogos/roles/roles-detail/roles-detail.component';
import { RolesViewComponent } from './components/intra/catalogos/roles/roles-view/roles-view.component';
import { RolesJoinComponent } from './components/intra/catalogos/roles/roles-join/roles-join.component';
import { DatosEmpleadoComponent } from './components/intra/datosEmpleados/datos-empleado/datos-empleado.component';
import { DetailEmpleadoComponent } from './components/intra/datosEmpleados/detail-empleado/detail-empleado.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { EstadoCivilComponent } from './components/intra/catalogos/estado-civil/estado-civil/estado-civil.component';
import { EstadoCivilDetailComponent } from './components/intra/catalogos/estado-civil/estado-civil-detail/estado-civil-detail.component';
import { EstadoCivilViewComponent } from './components/intra/catalogos/estado-civil/estado-civil-view/estado-civil-view.component';
import { EstadoCivilJoinComponent } from './components/intra/catalogos/estado-civil/estado-civil-join/estado-civil-join.component';
import { RolesPermisosComponent } from './components/intra/catalogos/roles/roles-permisos/roles-permisos.component';
import { DatosEmpleadosJoinComponent } from './components/intra/datosEmpleados/datos-empleados-join/datos-empleados-join.component';
import { AmbulanciasComponent } from './components/intra/ambulancias/ambulancias.component';
import { AmbulanciaDetailComponent } from './components/intra/ambulancias/ambulancia-detail/ambulancia-detail.component';
import { AmbulanciaViewComponent } from './components/intra/ambulancias/ambulancia-view/ambulancia-view.component';
import { AmbulanciaJoinComponent } from './components/intra/ambulancias/ambulancia-join/ambulancia-join.component';
import { RegistroDetailComponent } from './components/intra/registros/registro-detail/registro-detail.component';
import { RegistroViewComponent } from './components/intra/registros/registro-view/registro-view.component';
import { RegistroJoinComponent } from './components/intra/registros/registro-join/registro-join.component';
import { RegistrosComponent } from './components/intra/registros/registros/registros.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'intra/home', component: InicioComponent, canActivate: [AuthGuardService] },
  { path: 'intra/empleados', component: EmpleadosComponent, canActivate: [AuthGuardService] },
  { path: 'intra/empleados/detalle-empleado/:clvEmpleado', component: EmpleadoDetailComponent, canActivate: [AuthGuardService] },
  { path: 'intra/empleados/vista-empleado/:clvEmpleado', component: EmpleadoViewComponent, canActivate: [AuthGuardService] },
  { path: 'intra/empleados/registrar', component: EmpleadoJoinComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/roles', component: RolesComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/roles/detalle-rol/:clvRol', component: RolesDetailComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/roles/vista-rol/:clvRol', component: RolesViewComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/roles/registrar', component: RolesJoinComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/roles/permisos/:clvRol', component: RolesPermisosComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/estado-civil', component: EstadoCivilComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/estado-civil/detalle-estado-civil/:clvEstadoCivil', component: EstadoCivilDetailComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/estado-civil/vista-estado-civil/:clvEstadoCivil', component: EstadoCivilViewComponent, canActivate: [AuthGuardService] },
  { path: 'intra/catalogos/estado-civil/registrar', component: EstadoCivilJoinComponent, canActivate: [AuthGuardService] },
  { path: 'intra/datos-empleado', component: DatosEmpleadoComponent, canActivate: [AuthGuardService] },
  { path: 'intra/datos-empleado/detalle-empleado/:clvEmpleado', component: DetailEmpleadoComponent, canActivate: [AuthGuardService] },
  { path: 'intra/datos-empleado/registrar', component: DatosEmpleadosJoinComponent, canActivate: [AuthGuardService] },
  { path: 'intra/ambulancias', component: AmbulanciasComponent, canActivate: [AuthGuardService] },
  { path: 'intra/ambulancias/detalle-ambulancia/:clvAmbulancia', component: AmbulanciaDetailComponent, canActivate: [AuthGuardService] },
  { path: 'intra/ambulancias/vista-ambulancia/:clvAmbulancia', component: AmbulanciaViewComponent, canActivate: [AuthGuardService] },
  { path: 'intra/ambulancias/registrar', component: AmbulanciaJoinComponent, canActivate: [AuthGuardService] },
  { path: 'intra/registros', component: RegistrosComponent, canActivate: [AuthGuardService] },
  { path: 'intra/registros/detalle-registro/:clvRegistro', component: RegistroDetailComponent, canActivate: [AuthGuardService] },
  { path: 'intra/registros/vista-registro/:clvRegistro', component: RegistroViewComponent, canActivate: [AuthGuardService] },
  { path: 'intra/registros/registrar', component: RegistroJoinComponent, canActivate: [AuthGuardService] },

  //   { path: 'buscar/:termino', component: BuscadorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
