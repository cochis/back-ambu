export class Rol{
    constructor(
        public idRol: number,
        public nombre: string,
        public clvRol: string,
        public fechaCreacion: string,
        public activo: string,
        public permisos: string,
        public tipo: string,
        public ultimaActualizacion: string,
    ) {}
}
