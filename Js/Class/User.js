export class User{
    constructor (nombre,email) {
        this.nombre = nombre;
        this.email = email;
    }

    getNombre(){
        return this.nombre;
    }

    getEmail(){
        return this.email;
    }
}