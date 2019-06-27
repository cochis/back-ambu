import { Request, Response } from 'express';
import pool from '../database';
import moment from 'moment';
class LocalidadesController {

    public async list(req: Request, res: Response): Promise<void> {
        const localidades = await pool.query('SELECT * FROM localidades');
        res.json(localidades);
    }
    public async listActivo(req: Request, res: Response): Promise<void> {
        const localidades = await pool.query('SELECT * FROM localidades WHERE activo = 1');
        res.json(localidades);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvLocalidad } = req.params;
        const rol = await pool.query('SELECT * FROM localidades WHERE clvLocalidad = ?', [clvLocalidad]);
        if (rol.length > 0) {
            return res.json(rol[0]);
        }
        res.status(404).json({ text: "La localidad no existe" });
    }
     public async getOneByLocalidad(req: Request, res: Response): Promise<any> {
        const { clvSitio } = req.params;
        const rol = await pool.query('SELECT * FROM localidades WHERE clvSitio = ?', [clvSitio]);
        if (rol.length > 0) {
            return res.json(rol[0]);
        }
        res.status(404).json({ text: "El sitio no existe" });
    }
    public async getBySitio (req: Request, res: Response): Promise<any> {
        const { clvSitio } = req.params;
        const localidades = await pool.query('SELECT * FROM localidades WHERE clvSitio = ?', [clvSitio]);
        if (localidades.length > 0) {
            return res.json(localidades);
        }
        res.status(404).json({ text: "La localidades no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        //SETEAMOS USUARIO PARA HACER LA BUSQUEDA POR USUARIO
        const nombre = req.body.nombre;
        const clvLocalidad = req.body.clvLocalidad;

        
        //SETEAMOS clvEmpleado PARA HACER LA BUSQUEDA POR CLAVE DE EMPLEADO
        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.activo = true;
        if (req.body.nombre == null ||
            req.body.clvLocalidad == null ||
            req.body.clvSitio == null) {
            return res.status(404).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.nombre = MaysPrimera(req.body.nombre);
        req.body.clvLocalidad = req.body.clvLocalidad;
        req.body.activo = true;
        var localidad = await pool.query('SELECT * FROM localidades WHERE nombre = ?', [nombre]);
        if (localidad.length > 0) {
            return res.status(404).send({ error: 'Ya existe un rol con ese nombre. ' });
        } else {
            if (clvLocalidad.length < 5 || clvLocalidad.length > 5) {
                return res.status(404).send({ error: 'Clave de localidad no valida. ' });
            } else {
                var localidad2 = await pool.query('SELECT * FROM localidades WHERE clvLocalidad = ?', [clvLocalidad]);
                if (localidad2.length > 0) {
                    return res.status(404).send({ error: 'Ya existe un rol con esa clave de localidad. ' });
                } else {

                    const result = await pool.query('INSERT INTO localidades  set ?', [req.body]);
                    res.json({ message: 'Nuevo localidad guardada' });
                }
            }
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { clvLocalidad } = req.params;
        const oldRol = req.body;
        console.log(req.body);
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');

        if (req.body.nombre == null || req.body.clvLocalidad == null || req.body.nombre == "" || req.body.clvLocalidad == "") {
            return res.status(404).send({ error: 'Verifique los campos. ' });
        }
        if (req.body.clvLocalidad.length != 5) {
            return res.status(404).send({ error: 'Clave de localidad no valida. ' });
        }
        var updateLocalidad = await pool.query('UPDATE localidades set ? WHERE clvLocalidad = ?', [req.body, clvLocalidad]);
        if (updateLocalidad.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar la localidad" });
        } else {
            res.json({ message: "La localidad fue actualizada" });
        }

    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        req.body.activo = false;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        var updateLocalidad = await pool.query('UPDATE localidades set ? WHERE idLocalidad = ?', [req.body, id]);
        if (updateLocalidad.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar la localidad" });
        } else {
            res.json({ message: "La localidad fue actualizada" });
        }
    }
    public async activate(req: Request, res: Response): Promise<void> {
        const { clvLocalidad } = req.params;
        req.body.activo = true;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        const oldSitio = req.body;
        var updateLocalidad = await pool.query('UPDATE localidades set ? WHERE clvLocalidad = ?', [req.body, clvLocalidad]);
        if (updateLocalidad.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar la localidad" });
        } else {
            res.json({ message: "La localidad fue activada" ,
            registro : updateLocalidad[0]});
        }
    }
    public async desactivate(req: Request, res: Response): Promise<void> {
        const { clvLocalidad } = req.params;
        req.body.activo = false;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        const oldSitio = req.body;
        var updateRegistro = await pool.query('UPDATE localidades set ? WHERE clvLocalidad = ?', [req.body, clvLocalidad]);
        if (updateRegistro.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar la localidad" });
        } else {
            res.json({ message: "La localidad fue desactivada" ,
            registro : updateRegistro[0]});
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

const localidadesController = new LocalidadesController;
export default localidadesController; 