import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonItem, IonCardContent, IonLabel, IonInput, IonButton } from "@ionic/angular/standalone";
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonItem, IonCardContent,
    IonLabel, IonInput, IonButton, ReactiveFormsModule
  ],
})
export class ChangePasswordPage {

  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private supabaseService: SupabaseService
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  async confirmChange() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Password',
      message: 'Do you confirm your password change?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Yes', handler: () => this.changePassword() }
      ]
    });
    await alert.present();
  }

  async changePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      return this.showError('New passwords do not match!');
    }

    try {
      // Get current user
      const user = await this.supabaseService.getCurrentUser();
      if (!user) {
        return this.showError('No logged-in user found!');
      }

      // Re-authenticate (Supabase requires recent login to change password)
     await this.supabaseService.signIn(user.email!, currentPassword);

      // Update password
      await this.supabaseService.updatePassword(newPassword);

      await this.showSuccess('Password changed successfully!');
      this.passwordForm.reset();
    } catch (err: any) {
      console.error(err);
      this.showError(err.message || 'Failed to change password.');
    }
  }

  async showError(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showSuccess(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
