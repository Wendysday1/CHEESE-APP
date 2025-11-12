import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg
} from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg
  ]
})
export class OrdersPage implements OnInit {
  currentOrder: any = null;
  pastOrders: any[] = [];
  userId: string = '';

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    // Get real logged-in user ID
    const user = await this.supabaseService.getCurrentUser();
    if (!user) return;

    this.userId = user.id;
    await this.loadOrders();
  }

  async loadOrders() {
    try {
      const allOrders = await this.supabaseService.getOrders(this.userId);

      // Separate current (pending) and past (everything else) orders
      this.currentOrder = allOrders.find(o => o.status === 'pending') || null;
      this.pastOrders = allOrders.filter(o => o.status !== 'pending');
    } catch (err) {
      console.error('Error loading orders:', err);
    }
  }

  async markOrderComplete(order: any) {
    const confirmed = confirm('Are you sure you want to mark this order as complete?');
    if (!confirmed) return;

    try {
      await this.supabaseService.completeOrder(order.id);
      alert('Order completed!');
      await this.loadOrders(); // refresh orders
    } catch (err) {
      console.error('Error completing order:', err);
      alert('Failed to complete order.');
    }
  }
}
