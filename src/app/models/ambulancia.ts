export class Ambulancia{
    constructor(
        public idAmbulancia: number,
        public nombre: string,
        public clvAmbulancia: string,
        public placa: string,
        public numeroEconomico: string,
        public marca: string,
        public modelo: string,
        public activo: boolean,
        public ultimaActualizacion: string,
        public fechaCreacion: string

    ) {}
}
