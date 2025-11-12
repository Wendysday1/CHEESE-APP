import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonRadioGroup, IonList, IonItem, IonRadio, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonRadioGroup, IonList, IonItem, IonRadio, IonLabel],
})
export class AddressesComponent  implements OnInit {

    @Input() addresses: any[] = []; 
    @Output() close: EventEmitter<any> = new EventEmitter();
  

  constructor() { }

  ngOnInit() {}

  dismiss(data?: any){
    this.close.emit(data); 
  }

}
