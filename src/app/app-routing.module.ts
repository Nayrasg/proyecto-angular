import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPersonaComponent } from './components/add-edit-persona/add-edit-persona.component';
import { ListPersonaComponent } from './components/list-persona/list-persona.component';

//creamos las rutas
const routes: Routes = [
  { path: 'add', component: AddEditPersonaComponent }, //si el usuario pone la ruta/add muestra el componente de edit. agregar
  { path: '', component: ListPersonaComponent }, //si el usuario no pone nada muestra el componente de list
  { path: 'edit/:id', component: AddEditPersonaComponent }, //si el usuario pone edit con el id de la persona la muestra el componente de edit. editar
  { path: '**', component: ListPersonaComponent } //si el usuario pone cualquier otra ruta muestra el componente de list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
