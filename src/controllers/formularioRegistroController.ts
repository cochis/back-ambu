import { Request, Response } from 'express';
import pool from '../database';
import moment from 'moment';
class FormularioRegistroController {

    public async list(req: Request, res: Response): Promise<void> {
        const formularioregistro = await pool.query('SELECT * FROM formularioregistros');
        res.json(formularioregistro);
    }
    public async listActivo(req: Request, res: Response): Promise<void> {
        const formularioregistro = await pool.query('SELECT * FROM formularioregistros  WHERE activo = 1');
        res.json(formularioregistro);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvFormularioRegistro } = req.params;
        const formularioRegistro = await pool.query('SELECT * FROM formularioregistros WHERE clvFormularioRegistro = ?', [clvFormularioRegistro]);
        if (formularioRegistro.length > 0) {
            return res.json(formularioRegistro[0]);
        }
        res.status(404).json({ text: "La formulario de registro no existe." });
    }


    public async create(req: Request, res: Response): Promise<void> {
        //SETEAMOS USUARIO PARA HACER LA BUSQUEDA POR USUARIO
        const nombre = req.body.nombre;
        const clvFormularioRegistro = req.body.clvFormularioRegistro;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.activo = true;
        //SETEAMOS clvEmpleado PARA HACER LA BUSQUEDA POR CLAVE DE EMPLEADO
        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        if (req.body.nombre == null ||
            req.body.clvFormularioRegistro == null ||
            req.body.clvTipo == null 
        ) {
            return res.status(404).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.nombre = req.body.nombre.toUpperCase();
        req.body.clvFormularioRegistro = req.body.clvFormularioRegistro.toUpperCase();
        req.body.activo = true;
        var formularioRegistro = await pool.query('SELECT * FROM formularioRegistros WHERE nombre = ?', [nombre]);
        if (formularioRegistro.length > 0) {
            return res.status(404).send({ error: 'Ya existe una campo con ese nombre. ' });
        } else {
            if (clvFormularioRegistro.length < 8 || clvFormularioRegistro.length > 8) {
                return res.status(404).send({ error: 'Clave de campo no valida. ' });
            } else {
                var formularioRegistro2 = await pool.query('SELECT * FROM formularioRegistros WHERE clvFormularioRegistro = ?', [clvFormularioRegistro]);
                if (formularioRegistro2.length > 0) {
                    return res.status(404).send({ error: 'Ya existe un formularioRegistro con esa clave de unidad. ' });
                } else {

                    const result = await pool.query('INSERT INTO formularioRegistros  set ?', [req.body]);
                    res.json({ message: 'Nueva campo para el formulario de registros guardado' });
                }
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { clvFormularioRegistro } = req.params;
        const oldEmpleado = req.body;

        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        var updateformularioRegistro = await pool.query('UPDATE formularioRegistros set ? WHERE clvFormularioRegistro = ?', [req.body, clvFormularioRegistro]);
        if (updateformularioRegistro.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el campo" });
        } else {
            res.json({ message: "La campo fue actualizado" });
        }

    }
   
    public async activate(req: Request, res: Response): Promise<void> {
        const { clvFormularioRegistro } = req.params;
        req.body.activo = true;
        var updateformularioRegistro = await pool.query('UPDATE formularioRegistros set ? WHERE clvFormularioRegistro = ?', [req.body, clvFormularioRegistro]);
        if (updateformularioRegistro.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el campo" });
        } else {
            res.json({ message: "La campo fue activado" });
        }
    }
    public async desactivate(req: Request, res: Response): Promise<void> {

        const { clvFormularioRegistro } = req.params;
        req.body.activo = false;
        const oldSitio = req.body;
        var updateformularioRegistro = await pool.query('UPDATE formularioRegistros set ? WHERE clvFormularioRegistro = ?', [req.body, clvFormularioRegistro]);
        if (updateformularioRegistro.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el campo" });
        } else {
            res.json({ message: "La campo fue activado" });
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

const formularioRegistroController = new FormularioRegistroController;
export default formularioRegistroController; 