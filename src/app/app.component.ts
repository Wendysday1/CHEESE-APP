import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonApp, IonRouterOutlet, IonMenu, IonHeader, IonItem, IonAvatar, IonLabel,
  IonText, IonContent, IonIcon, IonMenuToggle, IonToolbar, IonList, IonTitle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add, arrowBackOutline, bagHandleOutline, bagHandleSharp, bookOutline,
  bookSharp, callOutline, callSharp, cart, cartOutline, codeOutline,
  codeSharp, documentLockOutline, documentLockSharp, homeOutline, homeSharp,
  informationCircleOutline, informationCircleSharp, keyOutline, keySharp,
  locationOutline, locationSharp, logOutOutline, logOutSharp, personOutline,
  personSharp, remove, star, ticketOutline, trashOutline
} from 'ionicons/icons';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { SupabaseService } from './services/supabase';
import { Cart } from './services/cart/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonItem,
    IonAvatar,
    IonLabel,
    IonText,
    IonContent,
    IonIcon,
    NgClass,
    IonMenuToggle,
    NgFor,
    NgIf,
    RouterModule,
    IonToolbar,
    IonList,
    IonTitle,
  ],
})
export class AppComponent implements OnInit {
  profile = { name: 'Guest', email: '', avatar: 'assets/img/avatar.jpg' };
  isLoaded = false;
  pages: any[] = [];

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef,
      private cart: Cart,
  ) {
    this.addAllIcons();

    // Listen for login/signup/logout events
    window.addEventListener('user:login', () => this.loadUserProfile());
    window.addEventListener('user:logout', () => this.loadUserProfile());
  }

  async ngOnInit() {
    this.menuCtrl.enable(true);
    await this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const user = await this.supabaseService.getCurrentUser();

      if (!user) {
        // Guest menu
        this.profile = { name: 'Guest', email: '', avatar: 'assets/img/avatar.jpg' };
        this.pages = [
          { title: 'Login', url: '/login', icon: 'person', active: false },
          { title: 'Register', url: '/register', icon: 'person', active: false },
        ];
      } else {
        // Logged-in user
        this.profile.email = user.email || '';
        const profileData = await this.supabaseService.getProfile(user.id);
        this.profile.name = profileData?.full_name || 'User';
        this.profile.avatar = profileData?.avatar || 'assets/img/avatar.jpg';

        this.pages = [
          { title: 'Home', url: '/home', icon: 'home', active: true },
          { title: 'Profile', url: '/profile', icon: 'person', active: false },
          { title: 'Orders', url: '/orders', icon: 'bag-handle', active: false },
          { title: 'Change Password', url: '/change-password', icon: 'key', active: false },
          { title: 'About Us', url: '/about', icon: 'information-circle', active: false },
          { title: 'Developers', url: '/developers', icon: 'code', active: false },
          { title: 'History', url: '/history', icon: 'book', active: false },
          { title: 'Contact Us', url: '/contact', icon: 'call', active: false },
          { title: 'Sign Out', icon: 'log-out', route: true, active: false },
        ];
      }

      this.isLoaded = true;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.profile = { name: 'Guest', email: '', avatar: 'assets/img/avatar.jpg' };
      this.pages = [
        { title: 'Login', url: '/login', icon: 'person', active: false },
        { title: 'Register', url: '/register', icon: 'person', active: false },
      ];
      this.isLoaded = true;
      this.cdr.detectChanges();
    }
  }

  addAllIcons() {
    addIcons({
      star, cart, cartOutline, trashOutline, add, remove, arrowBackOutline,
      ticketOutline, locationOutline, homeOutline, homeSharp,
      informationCircleOutline, informationCircleSharp,
      documentLockOutline, documentLockSharp, logOutOutline, logOutSharp,
      keyOutline, keySharp, bagHandleOutline, bagHandleSharp,
      personOutline, personSharp, codeOutline, codeSharp,
      locationSharp, bookOutline, bookSharp, callSharp, callOutline,
    });
  }

  async setActive(page: any) {
    this.pages.forEach(p => p.active = false);
    page.active = true;

    if (!page.url && page.route) {
      await this.logout();
      return;
    }

    await this.loadUserProfile();
  }

  async logout() {
    await this.supabaseService.signOut();

    // Reset user profile
    this.profile = { name: 'Guest', email: '', avatar: 'assets/img/avatar.jpg' };

    // Reset menu pages
    this.pages = [
      { title: 'Login', url: '/login', icon: 'person', active: false },
      { title: 'Register', url: '/register', icon: 'person', active: false },
    ];

    // ✅ Clear cart on logout
    this.cart.clearCart();
    this.isLoaded = true;
    this.cdr.detectChanges();
    this.router.navigate(['/login']);
  }
}
