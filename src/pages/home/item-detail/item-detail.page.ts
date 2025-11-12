import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonTitle, 
  IonToolbar, 
  NavController, 
  IonItem, 
  IonLabel, 
  IonText, 
  IonButton, 
  IonFooter, 
  IonBadge } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from 'src/app/services/api/api';
import { Cart } from 'src/app/services/cart/cart';
import { Subscription } from 'rxjs';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [RouterLink, 
    IonBadge, 
    IonFooter, 
    UpperCasePipe, 
    IonLabel, 
    IonIcon, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonBackButton, 
    IonItem, 
    IonText, 
    IonButton,]
})
export class ItemDetailPage implements OnInit, OnDestroy {

  id!: string;
  item: any;
  addToCart : any;
  totalItems = 0;
  cartSub!: Subscription;
  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private api = inject(Api);
  private router = inject(Router);
  private supabase = inject(SupabaseService);
  public cart = inject(Cart);

  constructor() { }

  ngOnInit() {
    this.getItem();

    this.cartSub = this.cart.cart.subscribe({
      next: (cart) => {
        this.totalItems = cart ? cart?.totalItem :0;
      }
    });
  }

  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || id == '0') {
      this.navCtrl.back();
      return;
    }

    this.id = id;
    this.item = this.api.items.find((record) => record.id == id);
  }

  async addItem() {
    // Check if user is logged in
    const user = await this.supabase.getCurrentUser();
    if (!user) {
      // Redirect guest to login page
      this.router.navigate(['/login']);
      return;
    }

    // Add to cart for logged-in user
    await this.cart.addQuantity(this.item);
    this.addedText();
  }

  addedText() {
    this.addToCart = 'Added To Cart';
    setTimeout(() => {
      this.addToCart = null;
    }, 1000); 
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }
}
