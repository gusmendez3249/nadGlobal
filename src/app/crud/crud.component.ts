import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { CommonModule } from '@angular/common'; // Para ngForOf

// Interfaz con un id único para cada auto
interface Auto {
  id: number;
  marca: string;
  modelo: string;
  precio: number;
}

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega FormsModule y CommonModule aquí
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  auto: Auto = { id: 0, marca: '', modelo: '', precio: 0 }; // Inicializar auto con id
  autos: Auto[] = [];
  marcaBusqueda: string = '';

  // Agregar un auto al arreglo
  agregarAuto() {
    if (this.auto.marca && this.auto.modelo && this.auto.precio > 0) {
      // Si no tiene id (es un auto nuevo), lo generamos
      if (this.auto.id === 0) {
        this.auto.id = this.autos.length + 1; // Generar un id único
      }
      // Verificar que el auto no exista antes de agregarlo
      const autoExistente = this.autos.find(a => a.id === this.auto.id);
      if (autoExistente) {
        alert("Ya existe un auto con este ID.");
        return;
      }
      this.autos.push({ ...this.auto });
      this.auto = { id: 0, marca: '', modelo: '', precio: 0 }; // Limpiar formulario
    } else {
      alert("Todos los campos son obligatorios y el precio debe ser mayor a 0");
    }
  }

  // Buscar autos por marca
  buscarAuto() {
    if (this.marcaBusqueda.trim() === '') {
      alert("Ingrese una marca para buscar.");
      return;
    }
    this.autos = this.autos.filter(auto => auto.marca.toLowerCase().includes(this.marcaBusqueda.toLowerCase()));
  }

  // Mostrar todos los autos (restablecer lista)
  mostrarTodos() {
    this.marcaBusqueda = '';
    this.autos = [...this.autos]; // Simula recargar los autos
  }

  // Eliminar un auto por id
  eliminarAuto(id: number) {
    this.autos = this.autos.filter(auto => auto.id !== id);
  }

  // Editar un auto (cargar datos en el formulario)
  editarAuto(auto: Auto) {
    this.auto = { ...auto }; // Copiar el auto a editar
  }
}
