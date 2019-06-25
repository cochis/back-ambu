export class LoginEmpleado{
    constructor(
        public idLogin: number,
        public clvEmpleado: string,
        public fechaLogin: string,
        public fechaClose: string,
        public token: string
         ) {}
}
