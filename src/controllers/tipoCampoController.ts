import { Request, Response } from 'express';
import pool from '../database';
import moment from 'moment';
class TipoCamposController {

    public async list(req: Request, res: Response): Promise<void> {
        const tipoCampos = await pool.query('SELECT * FROM tipoCampos');
        res.json(tipoCampos);
    }
    public async listActivo(req: Request, res: Response): Promise<void> {
        const tipoCampos = await pool.query('SELECT * FROM tipoCampos  WHERE activo = 1');
        res.json(tipoCampos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvTipoCampo } = req.params;
        const tipoCampo = await pool.query('SELECT * FROM tipoCampos WHERE clvTipoCampo = ?', [clvTipoCampo]);
        if (tipoCampo.length > 0) {
            return res.json(tipoCampo[0]);
        }
        res.status(404).json({ text: "El tipo de campo no existe." });
    }


    public async create(req: Request, res: Response): Promise<void> {
        //SETEAMOS USUARIO PARA HACER LA BUSQUEDA POR USUARIO
        const nombre = req.body.nombre;
        const clvTipoCampo = req.body.clvTipoCampo;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.activo = true;
        //SETEAMOS clvEmpleado PARA HACER LA BUSQUEDA POR CLAVE DE EMPLEADO
        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        if (req.body.nombre == null ||
            req.body.clvTipoCampo == null
        ) {
            return res.status(404).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.nombre = req.body.nombre.toUpperCase();
        req.body.clvTipoCampo = req.body.clvTipoCampo.toUpperCase();
        req.body.activo = true;
        var tipoCampo = await pool.query('SELECT * FROM tipoCampos WHERE nombre = ?', [nombre]);
        if (tipoCampo.length > 0) {
            return res.status(404).send({ error: 'Ya existe un tipo de campo con ese nombre. ' });
        } else {
            if (clvTipoCampo.length < 5 || clvTipoCampo.length > 5) {
                return res.status(404).send({ error: 'Clave de tipo de campo no valido. ' });
            } else {
                var tipoCampo2 = await pool.query('SELECT * FROM tipoCampos WHERE clvTipoCampo = ?', [clvTipoCampo]);
                if (tipoCampo2.length > 0) {
                    return res.status(404).send({ error: 'Ya existe un tipo de campo con esa clave de campo. ' });
                } else {

                    const result = await pool.query('INSERT INTO tipoCampos  set ?', [req.body]);
                    res.json({ message: 'Nueva tipo de campo guardado' });
                }
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { clvTipoCampo } = req.params;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        var updatetipoCampo = await pool.query('UPDATE tipoCampos set ? WHERE clvTipoCampo = ?', [req.body, clvTipoCampo]);
        if (updatetipoCampo.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar tipo de campo" });
        } else {
            res.json({ message: "La tipo de campo fue actualizado" });
        }

    }
    public async activate(req: Request, res: Response): Promise<void> {
        const { clvTipoCampo } = req.params;
        req.body.activo = true;
        var updatetipoCampo = await pool.query('UPDATE tipoCampos set ? WHERE clvTipoCampo = ?', [req.body, clvTipoCampo]);
        if (updatetipoCampo.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el tipo de campo" });
        } else {
            res.json({ message: "El tipo de campo fue activado" });
        }
    }
    public async desactivate(req: Request, res: Response): Promise<void> {

        const { clvTipoCampo } = req.params;
        req.body.activo = false;
        const oldSitio = req.body;
        var updatetipoCampo = await pool.query('UPDATE tipoCampos set ? WHERE clvTipoCampo = ?', [req.body, clvTipoCampo]);
        if (updatetipoCampo.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el tipo de campo" });
        } else {
            res.json({ message: "El tipo de campo fue activado" });
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

const tipoCamposController = new TipoCamposController;
export default tipoCamposController; 