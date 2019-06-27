import express, { Router } from 'express';

import tipoCampoController from '../controllers/tipoCampoController';
var md_auth = require('../middlewares/authenticated');
class TipoCampoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',md_auth.ensureAuth , tipoCampoController.list);
        this.router.get('/activo',md_auth.ensureAuth , tipoCampoController.listActivo);
        this.router.get('/:clvTipoCampo', md_auth.ensureAuth ,tipoCampoController.getOne);
        this.router.post('/',md_auth.ensureAuth , tipoCampoController.create);
        this.router.put('/:clvTipoCampo',md_auth.ensureAuth , tipoCampoController.update);
        this.router.put('/activar/:clvTipoCampo',md_auth.ensureAuth , tipoCampoController.activate);
        this.router.put('/desactivar/:clvTipoCampo',md_auth.ensureAuth , tipoCampoController.desactivate);
    }

}

export default new TipoCampoRoutes().router;

