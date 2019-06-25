import express, { Router } from 'express';

import registrosController from '../controllers/registrosController';
var md_auth = require('../middlewares/authenticated');
class RegistrosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',md_auth.ensureAuth , registrosController.list);
        this.router.get('/:clvRegistro', md_auth.ensureAuth ,registrosController.getOne);
        this.router.get('/nombre/:nombre', md_auth.ensureAuth ,registrosController.getOneNombre);
        this.router.get('/busqueda/ultimo', md_auth.ensureAuth ,registrosController.last);
        this.router.post('/',md_auth.ensureAuth , registrosController.create);
        this.router.put('/:clvRegistro',md_auth.ensureAuth , registrosController.update);
        this.router.put('/desactivar/:clvRegistro',md_auth.ensureAuth , registrosController.desactivate);
        this.router.put('/activar/:clvRegistro',md_auth.ensureAuth , registrosController.activate);
    }

}

export default new RegistrosRoutes().router;

