export class EstadoCivil{
    constructor(
        public idEstadoCivil: number,
        public nombre: string,
        public clvEstadoCivil: string,
        public fechaCreacion: string,
        public activo: boolean,
        public tipo: string,
        public ultimaActualizacion: string
    ) {}
}
