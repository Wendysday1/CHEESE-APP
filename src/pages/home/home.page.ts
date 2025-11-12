import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonIcon, IonThumbnail, IonImg, IonCard, IonLabel, IonText, IonSearchbar, IonButtons, IonButton, IonBadge, IonMenuButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/services/cart/cart';
import { Api } from 'src/app/services/api/api';
import { SupabaseService } from 'src/app/services/supabase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
   imports: [
    CommonModule,
    IonBadge, IonButton, IonButtons, IonSearchbar, IonText, IonLabel, IonCard, IonImg,
    IonIcon, IonCol, IonRow, IonThumbnail, IonHeader, IonToolbar, IonTitle, IonContent,
    RouterLink, IonMenuButton
  ],
})
export class HomePage implements OnInit, OnDestroy {
  items: any[] = [];
  allItems: any[] = [];
  query!: string;
  totalItems = 0;
  cartSub!: Subscription;
  private api = inject(Api);
  public cart = inject(Cart);
  private SupabaseService = inject(SupabaseService);

  constructor() {}

  async ngOnInit() {
    console.log('ngoninit homepage');
    await this.getItems();

    this.cartSub = this.cart.cart.subscribe({
      next: (cart) => {
        this.totalItems = cart ? cart?.totalItem : 0;
      }
    });
  }

async getItems() {
  this.allItems = await this.SupabaseService.getProducts();
  console.log('Supabase items:', this.allItems); // <-- check if data is returned
  this.items = [...this.allItems];
}

async onSearchChange(event: any) {
    this.query = event.detail.value.toLowerCase();
    await this.querySearch();
  }


 async querySearch() {
    if (this.query && this.query.length > 0) {
      this.items = await this.SupabaseService.searchProducts(this.query);
    } else {
      this.items = [...this.allItems];
    }
  }

  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
  }
}


