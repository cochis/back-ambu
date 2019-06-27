import { Request, Response } from 'express';
import pool from '../database';
import moment from 'moment';
var now = moment().format('YYYY-MM-DD HH:mm:ss');

class SitiosController {

    public async list(req: Request, res: Response): Promise<void> {
        const sitios = await pool.query('SELECT * FROM sitios');
        res.json(sitios);
    }

    public async listActivo(req: Request, res: Response): Promise<void> {
        const sitios = await pool.query('SELECT * FROM sitios WHERE activo = 1');
        res.json(sitios);
    } 
    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvSitio } = req.params;
        const sitio = await pool.query('SELECT * FROM sitios WHERE clvSitio = ?', [clvSitio]);
        if (sitio.length > 0) {
            return res.json(sitio[0]);
        }
        res.status(404).json({ text: "El sitio no existe" });
    }
   
    public async getOneBySitio(req: Request, res: Response): Promise<any> {
        const { clvSitio } = req.params;
        const sitio = await pool.query('SELECT * FROM sitios WHERE clvSitio = ?', [clvSitio]);
        if (sitio.length > 0) {
            return res.json(sitio[0]);
        }
        res.status(404).json({ text: "El sitio no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const nombre = req.body.nombre;
        const clvSitio = req.body.clvSitio;
        //SETEAMOS clvEmpleado PARA HACER LA BUSQUEDA POR CLAVE DE EMPLEADO
        req.body.fechaCreacion =  moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.ultimaActualizacion =  moment().format('YYYY-MM-DD HH:mm:ss');

        req.body.activo = true;
        if (req.body.nombre == null ||
            req.body.clvSitio == null ) {
            return res.status(404).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.nombre = MaysPrimera(req.body.nombre);
        req.body.activo = true;
        var sitio = await pool.query('SELECT * FROM sitios WHERE nombre = ?', [nombre]);
        if (sitio.length > 0) {
            return res.status(404).send({ error: 'Ya existe un sitio con ese nombre. ' });
        } else {
            if (clvSitio.length < 5 || clvSitio.length > 5) {
                return res.status(404).send({ error: 'Clave de sitio no valida. ' });
            } else {
                var sitio2 = await pool.query('SELECT * FROM sitios WHERE clvSitio = ?', [clvSitio]);
                if (sitio2.length > 0) {
                    return res.status(404).send({ error: 'Ya existe un sitio con esa clave de sitio. ' });
                } else {

                    const result = await pool.query('INSERT INTO sitios  set ?', [req.body]);
                    res.json({ message: 'Nuevo sitio guardado' });
                }
            }
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { clvSitio } = req.params;
        
        const oldSitio = req.body;
        req.body.ultimaActualizacion =  moment().format('YYYY-MM-DD HH:mm:ss');
        if (req.body.nombre == null || req.body.clvSitio == null || req.body.nombre == "" || req.body.clvSitio == "") {
            return res.status(404).send({ error: 'Verifique los campos. ' });
        }
        if (req.body.clvSitio.length != 5) {
            return res.status(404).send({ error: 'Clave de sitio no valida. ' });
        }
        var updateSitio = await pool.query('UPDATE sitios set ? WHERE clvSitio = ?', [req.body, clvSitio]);
        if (updateSitio.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el Sitio" });
        } else {
            res.json({ message: "El sitio fue actualizado" });
        }

    }

    public async activate(req: Request, res: Response): Promise<void> {
        const { clvSitio } = req.params;
        req.body.activo = true;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        const oldSitio = req.body;
        var updateSitio = await pool.query('UPDATE sitios set ? WHERE clvSitio = ?', [req.body, clvSitio]);
        if (updateSitio.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el sitio" });
        } else {
            res.json({ message: "El sitio fue activada" ,
            registro : updateSitio[0]});
        }
    }
    public async desactivate(req: Request, res: Response): Promise<void> {
        const { clvSitio } = req.params;
        req.body.activo = false;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        const oldSitio = req.body;
        var updateSitio = await pool.query('UPDATE sitios set ? WHERE clvSitio = ?', [req.body, clvSitio]);
        if (updateSitio.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el sitio" });
        } else {
            res.json({ message: "El sitio fue desactivado" ,
            registro : updateSitio[0]});
        }
    }
}
function MaysPrimera(string: string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function convertName(string: string) {

    var res = string.split(" ");
    return res;
}

function cleanString(string: string) {
    string = string.trim();
    return string;
}

const sitiosController = new SitiosController;
export default sitiosController; 