import { Request, Response, json } from 'express';
import pool from '../database';
import { exists } from 'fs';
import moment from 'moment';
var now = moment().format('YYYY-MM-DD HH:mm:ss');
var bcript = require('bcrypt-nodejs');
var fs = require('fs');
var jwt = require('../services/jwt');
var path = require('path');
var nodemailer = require('nodemailer');

class EstadoCivilController {

    public async list(req: Request, res: Response): Promise<void> {
        const estadoCivil = await pool.query('SELECT * FROM estadoCivil');
        res.json(estadoCivil);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvEstadoCivil } = req.params;
        const estadoCivil = await pool.query('SELECT * FROM estadoCivil  WHERE clvEstadoCivil = ? ORDER by idEstadoCivil LIMIT 1', [clvEstadoCivil]);
        if (estadoCivil.length > 0) {
            return res.json(estadoCivil[0]);
        }
        res.status(404).json({ text: "El estado civil no existe" });
    }


    public async create(req: Request, res: Response): Promise<void> {
        //SETEAMOS USUARIO PARA HACER LA BUSQUEDA POR USUARIO
        const tipo = req.body.tipo;
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const clvEstadoCivil = req.body.clvEstadoCivil;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');

        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.activo = true;
        if (req.body.tipo == null ||
            req.body.nombre == null ||
            req.body.clvEstadoCivil == null) {
            return res.status(200).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.nombre = MaysPrimera(req.body.nombre);
        req.body.clvEstadoCivil = req.body.clvEstadoCivil;
        req.body.activo = true;
        var estadoCivil = await pool.query('SELECT * FROM estadoCivil WHERE nombre = ?', [nombre]);
        if (estadoCivil.length > 0) {
            return res.status(200).send({ error: 'Ya existe un estado civil con ese nombre. ' });
        } else {
            if (clvEstadoCivil.length < 5 || clvEstadoCivil.length > 5) {
                return res.status(200).send({ error: 'Clave de estado civil no valida. ' });
            } else {
                var estadoCivil2 = await pool.query('SELECT * FROM estadoCivil WHERE clvEstadoCivil = ?', [clvEstadoCivil]);
                if (estadoCivil2.length > 0) {
                    return res.status(200).send({ error: 'Ya existe un estado civil con esa clave . ' });
                } else {

                    const result = await pool.query('INSERT INTO estadoCivil  set ?', [req.body]);
                    res.json({
                        message: 'Nuevo estado civil guardado',
                        estadoCivil: result.affectedRows[0]
                    });
                }
            }
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { clvEstadoCivil } = req.params;

        // const oldRol = req.body;
        // req.body.nombre = cleanString(req.body.nombre);
        // req.body.clvRol = cleanString(req.body.clvRol );
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        if (req.body.nombre == null || req.body.clvEstadoCivil == null || req.body.nombre == "" || req.body.clvEstadoCivil == "") {
            return res.status(200).send({ error: 'Verifique los campos. ' });
        }
        if (clvEstadoCivil.length != 5) {
            return res.status(200).send({ error: 'Clave de estado civil no valida. ' });
        }
        var updateEstadoCivil = await pool.query('UPDATE estadoCivil set ? WHERE clvEstadoCivil = ?', [req.body, clvEstadoCivil]);
        if (updateEstadoCivil.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el Estado civil" });
        } else {
            res.json({
                message: "El estado civil fue actualizado",
                estadoCivil: updateEstadoCivil[0]
            });
        }

    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { clvEstadoCivil } = req.params;
        req.body.activo = false;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        // const oldRol = req.body;
        var updateEstadoCivil = await pool.query('UPDATE estadoCivil set ? WHERE clvEstadoCivil = ?', [req.body, clvEstadoCivil]);
        if (updateEstadoCivil.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el estado civil" });
        } else {
            res.json({
                message: "El estado civil fue actualizado",
                estadoCivil: updateEstadoCivil[0]
            });
        }
    }
    public async activated(req: Request, res: Response): Promise<void> {
        const { clvEstadoCivil } = req.params;
        req.body.activo = true;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        // const oldRol = req.body;
        var updateEstadoCivil = await pool.query('UPDATE estadoCivil set ? WHERE clvEstadoCivil = ?', [req.body, clvEstadoCivil]);
        if (updateEstadoCivil.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el estado civil" });
        } else {
            res.json({
                message: "El estado civil fue actualizado",
                estadoCivil: updateEstadoCivil[0]
            });
        }
    }

}
function MaysPrimera(string: string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const estadoCivilController = new EstadoCivilController;
export default estadoCivilController; 
