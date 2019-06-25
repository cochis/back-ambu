import { Request, Response } from 'express';
import pool from '../database';
import moment from 'moment';
class AmbulanciasController {

    public async list(req: Request, res: Response): Promise<void> {
        const ambulancias = await pool.query('SELECT * FROM ambulancias');
        res.json(ambulancias);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvAmbulancia } = req.params;
        const ambulancia = await pool.query('SELECT * FROM ambulancias WHERE clvAmbulancia = ?', [clvAmbulancia]);
        if (ambulancia.length > 0) {
            return res.json(ambulancia[0]);
        }
        res.status(404).json({ text: "La ambulancia no existe." });
    }

    public async create(req: Request, res: Response): Promise<void> {
        //SETEAMOS USUARIO PARA HACER LA BUSQUEDA POR USUARIO
        const nombre = req.body.nombre;
        const clvAmbulancia = req.body.clvAmbulancia;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.activo = true;
        //SETEAMOS clvEmpleado PARA HACER LA BUSQUEDA POR CLAVE DE EMPLEADO
        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        if (req.body.nombre == null ||
            req.body.clvAmbulancia == null ||
            req.body.placa == null ||
            req.body.numeroEconomico == null ||
            req.body.marca == null 
            // req.body.modelo == null ||
            // req.body.tipo == null
            ) {
            return res.status(200).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.nombre = req.body.nombre.toUpperCase();
        req.body.clvAmbulancia = req.body.clvAmbulancia.toUpperCase();
        req.body.activo = true;
        var ambulancia = await pool.query('SELECT * FROM ambulancias WHERE nombre = ?', [nombre]);
        if (ambulancia.length > 0) {
            return res.status(200).send({ error: 'Ya existe una ambulancia con ese nombre. ' });
        } else {
            if (clvAmbulancia.length < 5 || clvAmbulancia.length > 5) {
                return res.status(200).send({ error: 'Clave de ambulancia no valida. ' });
            } else {
                var ambulancia2 = await pool.query('SELECT * FROM ambulancias WHERE clvAmbulancia = ?', [clvAmbulancia]);
                if (ambulancia2.length > 0) {
                    return res.status(200).send({ error: 'Ya existe un ambulancia con esa clave de unidad. ' });
                } else {

                    const result = await pool.query('INSERT INTO ambulancias  set ?', [req.body]);
                    res.json({ message: 'Nueva ambulancias guardada' });
                }
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {clvAmbulancia } = req.params;
        const oldEmpleado = req.body;

        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        var updateAmbulancia = await pool.query('UPDATE ambulancias set ? WHERE clvAmbulancia = ?', [req.body, clvAmbulancia]);
        if (updateAmbulancia.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar al albulancia" });
        } else {
            res.json({ message: "La ambulancia fue actualizada" });
        }

    }
    // public async update(req: Request, res: Response): Promise<void> {
    //     console.log('entro a actualizar');
    //     const { clvAmbulancia } = req.params;
    //     const oldUnidad = req.body;

    //     if (req.body.nombre == null || req.body.clvAmbulancia == null || req.body.nombre == "" || req.body.clvAmbulancia == "") {
    //         return res.status(200).send({ error: 'Verifique los campos. ' });
    //     }
    //     if (req.body.clvAmbulancia.length != 5) {
    //         return res.status(200).send({ error: 'Clave de ambulancia no valida. ' });
    //     }

    //     var validaAmbulancia = await pool.query('SELECT * FROM ambulancias WHERE nombre = ?', [req.body.nombre]);
    //     if (validaAmbulancia.length > 0) {
    //         return res.status(200).send({ error: 'Ya existe una ambulancia con ese nombre. ' });
    //     }
    //     validaAmbulancia = await pool.query('SELECT * FROM ambulancias WHERE clvAmbulancia = ?', [req.body.clvAmbulancia]);
    //     if (validaAmbulancia.length > 0) {
    //         return res.status(200).send({ error: 'Ya existe una ambulancia con esa clave de ambulancia. ' });
    //     }
    //     var updateAmbulancia = await pool.query('UPDATE ambulancias set ? WHERE clvAmbulancia = ?', [req.body, clvAmbulancia]);
    //     if (updateAmbulancia.affectedRows <= 0) {
    //         res.json({ error: "No se pudo localizar la ambulancia" });
    //     } else {
    //         res.json({ message: "La ambulancia fue actualizada" });
    //     }

    // }

    public async delete(req: Request, res: Response): Promise<void> {
        const { clvAmbulancia } = req.params;
        req.body.activo = false;
        const oldUnidad = req.body;
        var updateAmbulancia = await pool.query('UPDATE ambulancias set ? WHERE clvAmbulancia = ?', [req.body, clvAmbulancia]);
        if (updateAmbulancia.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar la ambulancia" });
        } else {
            res.json({ message: "la ambulancia fue actualizada" });
        }
    }
    public async activate(req: Request, res: Response): Promise<void> {
        const { clvAmbulancia } = req.params;
        req.body.activo = true;
        const oldSitio = req.body;
        var updateambulancia = await pool.query('UPDATE ambulancias set ? WHERE clvAmbulancia = ?', [req.body, clvAmbulancia]);
        if (updateambulancia.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el ambulancia" });
        } else {
            res.json({ message: "La Ambulancia fue activada" });
        }
    }
    public async desactivate(req: Request, res: Response): Promise<void> {

        const { clvAmbulancia } = req.params;
        req.body.activo = false;
        const oldSitio = req.body;
        var updateambulancia = await pool.query('UPDATE ambulancias set ? WHERE clvAmbulancia = ?', [req.body, clvAmbulancia]);
        if (updateambulancia.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el ambulancia" });
        } else {
            res.json({ message: "La Ambulancia fue activada" });
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

const ambulanciasController = new AmbulanciasController;
export default ambulanciasController; 