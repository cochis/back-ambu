import express, { Router } from 'express';

import localidadesController from '../controllers/localidadesController';
var md_auth = require('../middlewares/authenticated');
class LocalidadesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',md_auth.ensureAuth , localidadesController.list);
        this.router.get('/activo',md_auth.ensureAuth , localidadesController.listActivo);
        this.router.get('/:clvLocalidad', md_auth.ensureAuth ,localidadesController.getOne);
        this.router.get('/localidadesBySitio/:clvSitio', md_auth.ensureAuth ,localidadesController.getBySitio);
        this.router.post('/',md_auth.ensureAuth , localidadesController.create);
        this.router.put('/:clvLocalidad',md_auth.ensureAuth , localidadesController.update);
        this.router.put('/desactivar/:clvLocalidad',md_auth.ensureAuth , localidadesController.desactivate);
        this.router.put('/activar/:clvLocalidad',md_auth.ensureAuth , localidadesController.activate);
    }

}

export default new LocalidadesRoutes().router;

