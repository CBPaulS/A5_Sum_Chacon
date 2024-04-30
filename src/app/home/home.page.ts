import { Component, Input, OnInit } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @Input() Temp: number = 20; // Porcentaje de llenado del termómetro
  public barColor: string = ''; // Color de la barra

  constructor(private database: Database) {}

  async ngOnInit() {
    // Solicitar permisos de notificaciones si no se han otorgado previamente
    await LocalNotifications.requestPermissions();

    // Leer el valor de "Temp" de la base de datos de Firebase en tiempo real
    const tempRef = ref(this.database, '/Temp'); // Referencia a la variable "Temp"
    object(tempRef).subscribe((data) => {
      this.Temp = data.snapshot.val(); // Establecer la propiedad Temp con el valor
      this.setBarColor(); // Actualizar el color de la barra según el nuevo valor de Temp
      this.handleNotifications(this.Temp); // Enviar notificaciones según el valor de Temp
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

  async handleNotifications(tempValue: number) {
    if (tempValue <= 20) {
      // Enviar notificación para clima frío
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '¡Frío!',
            body: 'La temperatura está baja, abrígate.',
            id: 1,
          },
        ],
      });
    } else if (tempValue <= 50) {
      // Enviar notificación para clima neutral
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Clima neutral',
            body: 'La temperatura está agradable.',
            id: 2,
          },
        ],
      });
    } else {
      // Enviar notificación para calor extremo
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '¡Calor extremo!',
            body: 'Toma precauciones contra el calor intenso.',
            id: 3,
          },
        ],
      });
    }
  }
}
