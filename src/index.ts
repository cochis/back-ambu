import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
// import indexRoutes from './routes/indexRoutes';
import empleadosRoutes from './routes/empleadosRoutes';
import rolesRoutes from './routes/rolesRoutes';
import sitiosRoutes  from './routes/sitiosRoutes';
import loginEmpleadosRoutes from './routes/loginEmpleadosRoutes';
import datosEmpleado from './routes/datosEmpleadoRoutes';
import contactoRoutes from './routes/contactoRoutes';
import estadoCivilRoutes from './routes/estadoCivilRoutes';
import ambulanciasRoutes from './routes/ambulanciasRoutes';
import registrosRoutes from './routes/registrosRoutes';
import localidadesRoutes from './routes/localidadesRoutes';
import clientesRoutes from './routes/clientesRoutes';
import formularioRegistroRoutes from './routes/formularioRegistroRoutes';
import tipoCampoRoutes from './routes/tipoCampoRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3200);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/', express.static('client',{redirect:false}));
        this.app.use('/api/empleados', empleadosRoutes);
        this.app.use('/api/roles', rolesRoutes);
        this.app.use('/api/ambulancias', ambulanciasRoutes);
        this.app.use('/api/login', loginEmpleadosRoutes);
        this.app.use('/api/datos-empleado', datosEmpleado);
        this.app.use('/api/send-contacto', contactoRoutes);
        this.app.use('/api/estado-civil', estadoCivilRoutes);
        this.app.use('/api/registro', registrosRoutes);
        this.app.use('/api/localidades', localidadesRoutes);
        this.app.use('/api/clientes', clientesRoutes); 
        this.app.use('/api/sitios', sitiosRoutes);
        this.app.use('/api/formularioRegistro', formularioRegistroRoutes);
        this.app.use('/api/tipoCampoRoutes', tipoCampoRoutes);
        
        
        this.app.get('*', function(req,res,next){res.sendFile('client/index.html')});     
        
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on puerto', this.app.get('port'));
        });
    }

}  

const server = new Server();
server.start();