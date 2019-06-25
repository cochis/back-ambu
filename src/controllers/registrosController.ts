import { Request, Response } from 'express';
import pool from '../database';
import moment from 'moment';
class RegistrosController {

    public async list(req: Request, res: Response): Promise<void> {
        const registros = await pool.query('SELECT * FROM registros order by idRegistro DESC ');
        res.json(registros);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvRegistro } = req.params;
        const registro = await pool.query('SELECT * FROM registros WHERE clvRegistro = ?', [clvRegistro]);
        if (registro.length > 0) {
            return res.json(registro[0]);
        }
        res.status(404).json({ text: "El registro no existe." });
    }
    public async getOneNombre(req: Request, res: Response): Promise<any> {
        const { nombre } = req.params;
        const registro = await pool.query('SELECT * FROM registros WHERE rt = ?', [nombre]);
        if (registro.length > 0) {
            return res.json(registro[0]);
        }
        res.status(404).json({ text: "El registro no existe." });
    }
    public async last(req: Request, res: Response): Promise<any> {
        const { clvRegistro } = req.params;
        const registro = await pool.query('SELECT * FROM registros order by idRegistro DESC LIMIT 1', [clvRegistro]);
        if (registro.length > 0) {
            return res.json(registro[0]);
        }
        res.status(404).json({ text: "El registro no existe." });
    }

    public async create(req: Request, res: Response): Promise<void> {
        //SETEAMOS USUARIO PARA HACER LA BUSQUEDA POR USUARIO
     
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.activo = true;
        //SETEAMOS clvEmpleado PARA HACER LA BUSQUEDA POR CLAVE DE EMPLEADO
        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.fecha = moment().format('YYYY-MM-DD');
        if (req.body.nombrePaciente == null ||
            req.body.clvCliente == null ||
            req.body.clvServicio == null ||
            req.body.rt == null
            // req.body.modelo == null ||
            // req.body.tipo == null
        ) {
            return res.status(200).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.activo = true;
        const registro = await pool.query('INSERT INTO registros  set ?', [req.body]);
        res.json({ message: 'Nueva registro guardado' });
    } 

    public async update(req: Request, res: Response): Promise<void> {
        const { clvRegistro } = req.params;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        var updateRegistro = await pool.query('UPDATE registros set ? WHERE clvRegistro = ?', [req.body, clvRegistro]);
        if (updateRegistro.affectedRows <= 0) {
            res.json({ error : "No se pudo localizar el registro" });
        } else {
            res.json({ message: "El registro fue actualizado" ,
            registro : updateRegistro[0] });
        }

    }
    

    
    public async activate(req: Request, res: Response): Promise<void> {
        const { clvRegistro } = req.params;
        req.body.activo = true;
        const oldSitio = req.body;
        var updateRegistro = await pool.query('UPDATE registros set ? WHERE clvRegistro = ?', [req.body, clvRegistro]);
        if (updateRegistro.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el registro" });
        } else {
            res.json({ message: "El registro fue activado" ,
            registro : updateRegistro[0]});
        }
    }
    public async desactivate(req: Request, res: Response): Promise<void> {

        const { clvRegistro } = req.params;
        req.body.activo = false;
        const oldSitio = req.body;
        var updateRegistro = await pool.query('UPDATE registros set ? WHERE clvRegistro = ?', [req.body, clvRegistro]);
        if (updateRegistro.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el registro" });
        } else {
            res.json({ message: "El registro fue desactivado" ,
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

const registrosController = new RegistrosController;
export default registrosController; 