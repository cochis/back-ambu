import express, { Router } from 'express';

import formularioRegistroController from '../controllers/formularioRegistroController';
var md_auth = require('../middlewares/authenticated');
class AmbulanciasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',md_auth.ensureAuth , formularioRegistroController.list);
        this.router.get('/activo',md_auth.ensureAuth , formularioRegistroController.listActivo);
        this.router.get('/:clvFormularioRegistro', md_auth.ensureAuth ,formularioRegistroController.getOne);
        this.router.post('/',md_auth.ensureAuth , formularioRegistroController.create);
        this.router.put('/:clvFormularioRegistro',md_auth.ensureAuth , formularioRegistroController.update);
        this.router.put('/activar/:clvFormularioRegistro',md_auth.ensureAuth , formularioRegistroController.activate);
        this.router.put('/desactivar/:clvFormularioRegistro',md_auth.ensureAuth , formularioRegistroController.desactivate);
    }

}

export default new AmbulanciasRoutes().router;

