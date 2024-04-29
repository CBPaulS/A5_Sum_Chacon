import { Component, Input, OnInit } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @Input() Temp: number = 20; // Porcentaje de llenado del termómetro
  public barColor: string = ''; // Color de la barra

  constructor(private database: Database) {}

  ngOnInit() {
    // Read "Temp" value from Firebase Realtime Database
    const tempRef = ref(this.database, '/Temp'); // Reference to the "Temp" variable
    object(tempRef).subscribe((data) => {
      this.Temp = data.snapshot.val(); // Set the Temp property with the value
      this.setBarColor(); // Update the bar color based on the new Temp value
    });
  }

  setBarColor() {
    if (this.Temp <= 20) {
      this.barColor = 'blue'; // Azul para valores bajos
    } else if (this.Temp <= 50) {
      this.barColor = 'green'; // Verde para valores medianos
    } else {
      this.barColor = 'red'; // Rojo para valores altos
    }
  }
}
