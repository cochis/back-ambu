export class Empleado {
    constructor (
        public idEmpleado: number,
        public nombre: string,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public clvEmpleado: string,
        public usuario: string,
        public password: string,
        public rolEmpleado: string,
        public fechaCreacion: string,
        public activo: boolean,
        public fechaSalida: string,
        public ultimaActualizacion: string,
        public ultimaModificacion: string,
        public correoEmpleado: string
    ) {}
}

