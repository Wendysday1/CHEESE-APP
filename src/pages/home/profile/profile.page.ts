import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  AlertController,
  LoadingController
} from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonAvatar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ]
})
export class ProfilePage implements OnInit {
  profile: any = {
    name: '',
    email: '',
    avatar: 'assets/img/avatar.jpg'
  };

  editedName: string = '';
  editedEmail: string = '';

  userId: string = '';

  constructor(
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private supabaseService: SupabaseService
  ) {}

  async ionViewWillEnter() {
    this.menuCtrl.enable(true);
    await this.loadProfile();
  }

  ngOnInit() {}

  async loadProfile() {
    const user = await this.supabaseService.getCurrentUser();
    if (!user) return;

    this.userId = user.id;
    this.editedEmail = user.email || '';
    
    const profileData = await this.supabaseService.getProfile(user.id);
    this.profile.name = profileData?.full_name || '';
    this.profile.avatar = profileData?.avatar || 'assets/img/avatar.jpg';
    this.editedName = this.profile.name;
  }

  async confirmChange() {
    const alert = await this.alertController.create({
      header: 'Confirm Changes',
      message: 'Are you sure you want to update your profile?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Yes',
          handler: async () => {
            await this.saveProfile();
          }
        }
      ]
    });
    await alert.present();
  }

  async saveProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Updating profile...'
    });
    await loading.present();

    const success = await this.supabaseService.updateProfile(
      this.userId,
      this.editedName,
      this.editedEmail
    );

    await loading.dismiss();

    if (success) {
      this.profile.name = this.editedName;
      this.profile.email = this.editedEmail;
      const successAlert = await this.alertController.create({
        header: 'Success',
        message: 'Profile updated successfully!',
        buttons: ['OK']
      });
      await successAlert.present();
    } else {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to update profile.',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }
}
