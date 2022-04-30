import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  //creamos lista de personas de tipo Persona que es un array
  listPersona: Persona[] = [ //creamos objetos
    {
      nombre: 'Violeta', apellidos: 'Ruiz Gomez', edad: 32, dni: '54081234F', cumpleanos: new Date('1999-12-03'), colorFavorito: 'Rojo', sexo: 'Mujer'

    },

    {
      nombre: 'Pedro', apellidos: 'Lopez Garcia', edad: 50, dni: '12345678H', cumpleanos: new Date ('1971-02-13'), colorFavorito: 'Rosado', sexo: 'Hombre'

    },
    {
      nombre: 'Sonia', apellidos: 'Gomez Perez', edad: 19, dni: '12345679P', cumpleanos: new Date('2009-05-11'), colorFavorito: 'Azul', sexo: 'Otro'

    }

  ];

  constructor() { }

    //metodo devolvemos el array Persona
  getPersonas () {
    return this.listPersona.slice();
  }

  //metodo para eliminar persona
  eliminarPersona(index:number) {
    this.listPersona.splice(index, 1); /*elimina la persona, le decimos que tiene que borrar apartir
    de index (numero de la columna a borrar) y elimine un elemnto*/
  }

  //metodo para almacenar persona
  agregarPersona(persona: Persona){
    this.listPersona.push(persona);
  }

  //metodo para devolver la persona usando el id
  getPersona(index: number)
  {
    return this.listPersona[index];
  }
  //metido para editar persona
  editarPersona(persona: Persona, index: number){
    this.listPersona[index].nombre = persona.nombre;
    this.listPersona[index].apellidos = persona.apellidos;
    this.listPersona[index].edad = persona.edad;
    this.listPersona[index].dni = persona.dni;
    this.listPersona[index].cumpleanos = persona.cumpleanos;
    this.listPersona[index].colorFavorito = persona.colorFavorito;
    this.listPersona[index].sexo = persona.sexo;

  }
}
