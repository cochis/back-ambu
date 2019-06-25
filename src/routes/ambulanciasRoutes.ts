import express, { Router } from 'express';

import ambulanciasController from '../controllers/ambulanciasController';
var md_auth = require('../middlewares/authenticated');
class AmbulanciasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',md_auth.ensureAuth , ambulanciasController.list);
        this.router.get('/:clvAmbulancia', md_auth.ensureAuth ,ambulanciasController.getOne);
        this.router.post('/',md_auth.ensureAuth , ambulanciasController.create);
        this.router.put('/:clvAmbulancia',md_auth.ensureAuth , ambulanciasController.update);
        this.router.delete('/:clvAmbulancia', md_auth.ensureAuth ,ambulanciasController.delete);
        this.router.put('/desactivar/:clvAmbulancia',md_auth.ensureAuth , ambulanciasController.delete);
        this.router.put('/activar/:clvAmbulancia',md_auth.ensureAuth , ambulanciasController.activate);
    }

}

export default new AmbulanciasRoutes().router;

