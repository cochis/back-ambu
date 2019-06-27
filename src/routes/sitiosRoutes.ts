import express, { Router } from 'express';

import sitiosController from '../controllers/sitiosController';
var md_auth = require('../middlewares/authenticated');
class SitiosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',md_auth.ensureAuth , sitiosController.list);
        this.router.get('/activo',md_auth.ensureAuth , sitiosController.listActivo);
        this.router.get('/:clvSitio', md_auth.ensureAuth ,sitiosController.getOne);
        this.router.post('/',md_auth.ensureAuth , sitiosController.create);
        this.router.put('/:clvSitio',md_auth.ensureAuth , sitiosController.update);
        this.router.put('/desactivar/:clvSitio',md_auth.ensureAuth , sitiosController.desactivate);
        this.router.put('/activar/:clvSitio',md_auth.ensureAuth , sitiosController.activate);
    }

}

export default new SitiosRoutes().router;
