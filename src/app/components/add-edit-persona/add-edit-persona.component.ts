import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditPersonaComponent implements OnInit {

  idPersona: any;
  accion = 'Crear';

  myForm: FormGroup; //variable de tipo formgroup (angular form)

  constructor(private fb: FormBuilder,
    private personaService: PersonaService,
    private route: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) {
    this.myForm = this.fb.group({
      //enalazamos con los datos proporcianados en el formulario y los validamos
      nombre: ['', [Validators.required, Validators.minLength(3)]], //rquerido y m-inimo 3 caracteres
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.max(125), Validators.pattern('^[0-9]+$')]], //requerido, menor que 125 y tiene que ser un numero
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]$')]], //requerido, 8 numeros y una letra
      cumpleanos: ['', [Validators.required]], //requerido
      colorFavorito: ['', [Validators.required, Validators.minLength(3)]],
      sexo: ['', [Validators.required]] //requerido
    });
    const idParam = 'id';
    this.idPersona = this.aRoute.snapshot.params[idParam]; //ontenemos la id d la persona
  }

  ngOnInit(): void {
    if (this.idPersona !== undefined) //si existe un id hay información para editar, sacamos componente editar
    {
      this.accion = 'Editar';
      this.getPersona();
    }
  }

  //metodo para agregar las persona al listado
  guardarPersona(){

    const persona: Persona = {
      //atrapamos los datos del formulario
      nombre: this.myForm.get('nombre')!.value,
      apellidos: this.myForm.get('apellidos')!.value,
      edad: this.myForm.get('edad')!.value,
      dni: this.myForm.get('dni')!.value,
      cumpleanos: this.myForm.get('cumpleanos')!.value,
      colorFavorito: this.myForm.get('colorFavorito')!.value,
      sexo: this.myForm.get('sexo')!.value

    };

    //preguntamos si es editar o guardar
    if (this.idPersona !== undefined){
      this.editarPersona(persona);
    } else {
      this.agregarPersona(persona);
    }

  }

  agregarPersona(persona: Persona){

    this.personaService.agregarPersona(persona);
    this.snackBar.open('La persona ha sido agregada con éxito!','', { duration: 3000});
    this.route.navigate(['/']); //despues de agregar volvemos a la raiz

  }

  editarPersona(persona: Persona){
    this.personaService.editarPersona(persona, this.idPersona);
    this.snackBar.open('La persona ha sido editada con éxito!','', { duration: 3000});
    this.route.navigate(['/']); //despues de agregar volvemos a la raiz
  }
  //metodo para obtener  persona
  getPersona(){
    const persona: Persona = this.personaService.getPersona(this.idPersona);
    //ponemos la informacion en los campos
    this.myForm.patchValue({
      nombre: persona.nombre,
      apellidos: persona.apellidos,
      edad: persona.edad,
      dni: persona.dni,
      cumpleanos: persona.cumpleanos,
      colorFavorito: persona.colorFavorito,
      sexo: persona.sexo
    })

  }

}
