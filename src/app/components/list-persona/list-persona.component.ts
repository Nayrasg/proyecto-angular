import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonaService } from 'src/app/service/persona.service';
import { Persona } from 'src/app/models/persona';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-persona',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.css']
})
export class ListPersonaComponent implements AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellidos', 'edad', 'dni', 'cumpleanos', 'colorFavorito', 'sexo', 'acciones']; //columnas de la tabla
  dataSource = new MatTableDataSource<Persona>(); //almacenamos datos de la tabla
  listPersona!: Persona[]; //creamos lista de persona que va a ser un array de Persona

  //para que el componente padre pueda acceder a ordenar
  @ViewChild(MatPaginator) paginator!: MatPaginator; //paginacion
  @ViewChild(MatSort) sort!: MatSort; //ordenar

  //usamos servicio creado
  constructor(private personaService: PersonaService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.cargarPersonas(); //cuando se inicializa el componente ejecuta el método

  }

  //filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //creamos metodo para cargar la lista de persona
  cargarPersonas() {
    this.listPersona = this.personaService.getPersonas();
    this.dataSource = new MatTableDataSource(this.listPersona); //dataSource lo queremos llenar con todo las personas
    this.dataSource.sort = this.sort; //ordenar
    this.dataSource.paginator = this.paginator; //paginacion
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'; //paginacion

  }

  //metodo para eliminar personas. Le pasamos el index
  eliminarPersona(index: number)
  {
    //mostramos dialogo de conformacion
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: '¿Esta seguro que desea eliminar la persona?' },
    });

      //cuando se cierra el dialogo ejecutamos el metodo
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {//si el usuario hace click en aceptar
        this.personaService.eliminarPersona(index); //ejecutamos el metodo de eliminar
        this.cargarPersonas(); //cargamos la tabla de nuevo
        this.snackBar.open('La persona ha sido eliminada con éxito!','', { duration: 3000}); //mensaje de exito
      }
    });

  }

}
