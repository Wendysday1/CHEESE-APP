import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase';
import { IonContent, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonList, IonLabel, IonItem, IonListHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [
    IonContent, IonButton, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonIcon, IonList, IonLabel, IonItem,
    IonListHeader
],
})
export class PaymentComponent implements OnInit {
  userId: string = 'user-id-placeholder'; // Replace with actual logged-in user
  amount: number = 100; // Example amount
  dismiss: any;

  constructor(private supabaseService: SupabaseService) {}

  async payCOD() {
    try {
      await this.supabaseService.payCOD(this.userId, this.amount);
      alert('Cash on Delivery order placed!');
    } catch (err: any) {
      alert('Error placing COD order: ' + err.message);
    }
  }

  ngOnInit() {
    // No need for PayPal
  }

  checkout() {
    this.payCOD(); // Directly call COD for checkout
  }
}
