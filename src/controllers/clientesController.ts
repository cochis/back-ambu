import { Request, Response } from 'express';
import pool from '../database';
import moment from 'moment';
var now = moment().format('YYYY-MM-DD HH:mm:ss');

class ClientesController {

    public async list(req: Request, res: Response): Promise<void> {
        const clientes = await pool.query('SELECT * FROM clientes');
        res.json(clientes);
    }
    public async listActivo(req: Request, res: Response): Promise<void> {
        const clientes = await pool.query('SELECT * FROM clientes WHERE activo = 1');
        res.json(clientes);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { clvCliente } = req.params;
        const cliente = await pool.query('SELECT * FROM clientes WHERE clvCliente = ?', [clvCliente]);
        if (cliente.length > 0) {
            return res.json(cliente[0]);
        }
        res.status(404).json({ text: "El cliente no existe" });
    }

    public async getOneByCliente(req: Request, res: Response): Promise<any> {
        const { clvCliente } = req.params;
        const cliente = await pool.query('SELECT * FROM clientes WHERE clvCliente = ?', [clvCliente]);
        if (cliente.length > 0) {
            return res.json(cliente[0]);
        }
        res.status(404).json({ text: "El cliente no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const nombre = req.body.nombre;
        const clvCliente = req.body.clvCliente;
        //SETEAMOS clvEmpleado PARA HACER LA BUSQUEDA POR CLAVE DE EMPLEADO
        req.body.fechaCreacion = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');

        req.body.activo = true;
        if (req.body.nombre == null ||
            req.body.clvCliente == null) {
            return res.status(404).send({ error: 'Envía los campos requeridos.' });
        }
        req.body.nombre = MaysPrimera(req.body.nombre);
        req.body.activo = true;
        var cliente = await pool.query('SELECT * FROM clientes WHERE nombre = ?', [nombre]);
        if (cliente.length > 0) {
            return res.status(404).send({ error: 'Ya existe un cliente con ese nombre. ' });
        } else {
            if (clvCliente.length < 5 || clvCliente.length > 5) {
                return res.status(404).send({ error: 'Clave de cliente no valida. ' });
            } else {
                var cliente2 = await pool.query('SELECT * FROM clientes WHERE clvCliente = ?', [clvCliente]);
                if (cliente2.length > 0) {
                    return res.status(404).send({ error: 'Ya existe un cliente con esa clave de cliente. ' });
                } else {

                    const result = await pool.query('INSERT INTO clientes  set ?', [req.body]);
                    res.json({ message: 'Nuevo cliente guardado' });
                }
            }
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { clvCliente } = req.params;
        const oldcliente = req.body;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        if (req.body.nombre == null || req.body.clvCliente == null || req.body.nombre == "" || req.body.clvCliente == "") {
            return res.status(404).send({ error: 'Verifique los campos. ' });
        }
        if (req.body.clvCliente.length != 5) {
            return res.status(404).send({ error: 'Clave de cliente no valida. ' });
        }
        var updatecliente = await pool.query('UPDATE clientes set ? WHERE clvCliente = ?', [req.body, clvCliente]);
        if (updatecliente.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el cliente" });
        } else {
            res.json({ message: "El cliente fue actualizado" });
        }

    }

    public async activate(req: Request, res: Response): Promise<void> {
        const { clvCliente } = req.params;
        req.body.activo = true;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        const oldcliente = req.body;
        var updatecliente = await pool.query('UPDATE clientes set ? WHERE clvCliente = ?', [req.body, clvCliente]);
        if (updatecliente.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el cliente" });
        } else {
            res.json({
                message: "El cliente fue activado",
                registro: updatecliente[0]
            });
        }
    }
    public async desactivate(req: Request, res: Response): Promise<void> {
        const { clvCliente } = req.params;
        req.body.activo = false;
        req.body.ultimaActualizacion = moment().format('YYYY-MM-DD HH:mm:ss');
        const oldcliente = req.body;
        var updatecliente = await pool.query('UPDATE clientes set ? WHERE clvCliente = ?', [req.body, clvCliente]);
        if (updatecliente.affectedRows <= 0) {
            res.json({ error: "No se pudo localizar el cliente" });
        } else {
            res.json({
                message: "El cliente fue desactivado",
                registro: updatecliente[0]
            });
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

const clientesController = new ClientesController;
export default clientesController; 