import { DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonImg,
  IonThumbnail,
  IonText,
  IonCol,
  IonRow,
  IonListHeader,
  IonList,
  IonItemGroup,
  IonFooter,
  IonModal,
  IonItemDivider,
  AlertController
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CouponsComponent } from './components/coupons/coupons.component';
import { Strings } from 'src/app/enum/strings.enum';
import { Cart } from 'src/app/services/cart/cart';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { AddressService } from 'src/app/services/address/address.service';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonItemDivider,
    IonModal,
    IonFooter,
    IonItemGroup,
    IonList,
    IonListHeader,
    IonRow,
    IonCol,
    IonText,
    IonImg,
    IonCard,
    IonIcon,
    IonButton,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonThumbnail,
    DecimalPipe,
    CouponsComponent,
    AddAddressComponent,
    AddressesComponent,
  ],
})
export class CartPage implements OnInit, OnDestroy {

  @ViewChild('coupon_modal') coupon_modal!: IonModal;
  @ViewChild('add_address_modal') add_address_modal!: IonModal;
  @ViewChild('address_modal') address_modal!: IonModal;

  previous!: string;
  cartSub!: Subscription;
  addressSub!: Subscription;
  selectedCoupon!: any;
  applyCoupon = false;
  isAddAddress = false;
  isSelectAddress = false;
  isCheckoutToShippingAddress = false;
  address!: any;
  model: any = null;
  currency = Strings.CURRENCY;
  addresses: any[] = [];

  private router = inject(Router);
  public cart = inject(Cart);
  private addressService = inject(AddressService);
  private supabaseService = inject(SupabaseService);
  private alertController = inject(AlertController);

  constructor() {}

  ngOnInit() {
    this.checkUrl();

    this.cartSub = this.cart.cart.subscribe({
      next: (cart) => {
        this.model = cart;
      },
    });

    this.getAddresses();

    this.addressSub = this.addressService.addresses.subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
    });
  }

  async getAddresses() {
    try {
      const addresses: any[] = await this.addressService.getAddresses();
      if (addresses?.length > 0) {
        this.address = addresses.find((address) => address.primary);
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkUrl() {
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop();
    this.previous = urlParts.join('/');
  }

  addQuantity(item: any) {
    this.cart.addQuantity(item);
  }

  subtractQuantity(item: any) {
    this.cart.subtractQuantity(item);
  }

  closeCouponModal(coupon: any, couponModal: IonModal) {
    if (coupon) {
      this.selectedCoupon = coupon;
      this.model.grandTotal -= this.selectedCoupon?.saved;
    }
    couponModal.dismiss();
  }

  removeCoupon() {
    if (this.selectedCoupon) {
      this.model.grandTotal += this.selectedCoupon.saved;
      this.selectedCoupon = null;
    }
  }

  closeAddAddressModal(data: any) {
    this.add_address_modal.dismiss();
    if (data) {
      this.address = data;
      if (this.isCheckoutToShippingAddress) {
        this.isCheckoutToShippingAddress = false;
        this.performCheckout();
      }
    }
  }

  closeAddressModal(data: any) {
    this.address_modal.dismiss();
    if (data) {
      if (data == 1) {
        this.isAddAddress = true;
      } else {
        this.address = data;
      }
    }
  }

  /** Updated checkout function */
  async checkout() {
    if (!this.address) {
      this.isAddAddress = true;
      this.isCheckoutToShippingAddress = true;
      return;
    }
    await this.performCheckout();
  }

  /** Perform COD payment + create order using real logged-in user */
  private async performCheckout() {
    try {
      // 🔹 Get the real logged-in user ID from Supabase
      const userId = await this.supabaseService.getUserId();

      // 1️⃣ Place COD payment
      await this.supabaseService.payCOD(userId, this.model.grandTotal);

      // 2️⃣ Save order with items and address
      await this.supabaseService.createOrder(
        userId,
        this.address,
        this.model.items,
        this.model.grandTotal
      );

      // 3️⃣ Show success popup
      const alert = await this.alertController.create({
        header: 'Checkout Success',
        message: 'Your order has been placed successfully!',
        buttons: ['OK'],
      });
      await alert.present();

      // 4️⃣ Clear cart
      this.cart.clearCart();

    } catch (err: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error placing order: ' + err.message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  navigateToPayout() {
    const paymentSection = document.querySelector('#payment-section');
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.addressSub) this.addressSub.unsubscribe();
  }
}
