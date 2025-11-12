import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonList, IonInput, IonTextarea, IonRow, IonCol, IonItem, IonLabel, IonToggle, IonText, IonSpinner, ModalController } from "@ionic/angular/standalone"; // <-- Added ModalController here
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  standalone: true,
  imports: [IonContent,
    IonButtons,
    IonButton,
    IonHeader, IonToolbar,
    IonTitle,
    IonIcon,
    ReactiveFormsModule,
    IonList,
    IonInput,
    IonTextarea,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonToggle,
    IonText,
    IonSpinner],
})

export class AddAddressComponent implements OnInit {
  form!: FormGroup;
  @Output() close: EventEmitter<any> = new EventEmitter();
  isLoading = false;
  private addressService = inject(AddressService);
  // Optional: Inject ModalController if you decide to use Ionic's built-in dismissal later
  // private modalCtrl = inject(ModalController); 

  constructor() {
    this.initForm();
  }

  ngOnInit() { }

  initForm() {
    this.form = new FormGroup({
      zipcode: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      house_no: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      state: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      save_as: new FormControl(null, { validators: [Validators.required] }),
      landmark: new FormControl(null, { validators: [] }),
      primary: new FormControl(false, { validators: [] })
    });
  }

  dismiss(data?: any) {
    this.close.emit(data);
  }

  save() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Form submitted:', this.form.value);

    this.addAddress(this.form.value);
  }

  async addAddress(data: any) {
    this.isLoading = true; // <-- Set loading state before API call
    try {
      const address = await this.addressService.addAddress(data);
      this.dismiss(address);
    } catch (e) {
      console.error('Error adding address:', e); // <-- Use console.error for better visibility
    } finally {
      this.isLoading = false; // <-- Clear loading state regardless of success/fail
    }
  }
}
