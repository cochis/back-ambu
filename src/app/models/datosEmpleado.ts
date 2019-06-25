import { Hijo } from './hijo';
export class DatosEmpleado {
    constructor (
        public idDatosEmpleado: number,
        public clvEmpleado: string,
        public nombreCompleto: string,
        public fechaIngreso: string,
        public clinicaImss: string,
        public rfc: string,
        public puesto: string,
        public sueldo: number,
        public horario: string[],
        public curp: string,
        public nss: string,
        public telefonoCasa: string,
        public telefonoMovil: string,
        public tipoSangre: string,
        public alergias: string,
        public domicilio: string,
        public estadoCivil: string,
        public hijos: Hijo[],
        public nombrePadre: string,
        public nombreMadre: string,
        public fechaCreacion: string,
        public ultimaActualizacion: string,
        public activo: boolean,
        public genero: string
    ) {}
}
