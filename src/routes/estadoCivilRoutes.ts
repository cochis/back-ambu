import express, { Router } from 'express';

import estadoCivilController from '../controllers/estadoCivilController';
var md_auth = require('../middlewares/authenticated');
class EstadoCivilRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', md_auth.ensureAuth , estadoCivilController.list);
        this.router.get('/:clvEstadoCivil',  md_auth.ensureAuth ,estadoCivilController.getOne);
        this.router.post('/', md_auth.ensureAuth , estadoCivilController.create);
        this.router.put('/:clvEstadoCivil', md_auth.ensureAuth , estadoCivilController.update);
        this.router.delete('/desactivar/:clvEstadoCivil',  md_auth.ensureAuth , estadoCivilController.delete);
        this.router.put('/activar/:clvEstadoCivil',  md_auth.ensureAuth , estadoCivilController.activated);
    }

}

export default new EstadoCivilRoutes().router;

