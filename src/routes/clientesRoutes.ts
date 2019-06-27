import express, { Router } from 'express';

import clientesController from '../controllers/clientesController';
var md_auth = require('../middlewares/authenticated');
class ClientesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',md_auth.ensureAuth , clientesController.list);
        this.router.get('/activo',md_auth.ensureAuth , clientesController.listActivo);
        this.router.get('/:clvCliente', md_auth.ensureAuth ,clientesController.getOne);
        this.router.post('/',md_auth.ensureAuth , clientesController.create);
        this.router.put('/:clvCliente',md_auth.ensureAuth , clientesController.update);
        this.router.put('/desactivar/:clvCliente',md_auth.ensureAuth , clientesController.desactivate);
        this.router.put('/activar/:clvCliente',md_auth.ensureAuth , clientesController.activate);
    }

}

export default new ClientesRoutes().router;
