export class Persona {

  //propiedades de la clase persona. Usamos el modificador protected para que las clases descendientes puedan usarlo
   //propiedades de la clase persona. Usamos el modificador protected para que las clases descendientes puedan usarlo
  nombre!: string
   apellidos!: string
   edad!: number
   dni!: string
   cumpleanos!: Date
   colorFavorito!: string
   sexo!: string
  //protected _direcciones:Direccion[] = []
  //protected _mails:Mail[] = []
  //protected _telefonos:Telefono[] = []
  //protected _notas:string
}
