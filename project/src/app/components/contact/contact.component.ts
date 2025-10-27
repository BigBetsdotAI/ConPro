import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { ContactModalComponent } from './contact-modal.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ContactModalComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isModalOpen = false;
  quickContactForm: FormGroup;
  isSubmitting = false;
  showThankYou = false;
  submittedData: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {
    this.quickContactForm = this.fb.group({
      quickName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      quickEmail: ['', [Validators.required, Validators.email]],
      quickPhone: ['', [Validators.required, Validators.pattern(/^[\d\s\+\-\(\)]+$/), Validators.minLength(10)]],
      quickMessage: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  openContactForm() {
    this.isModalOpen = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeContactForm() {
    this.isModalOpen = false;
    this.showThankYou = false;
    this.submittedData = null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  onSubmitQuickForm() {
    if (this.quickContactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const contactData = this.quickContactForm.value;
      // Simulate API call
      setTimeout(() => {
        this.submittedData = {
          name: contactData.quickName,
          email: contactData.quickEmail
        };
        this.showThankYou = true;
        this.quickContactForm.reset();
        this.isSubmitting = false;
      }, 1200);
    } else {
      this.markFormGroupTouched(this.quickContactForm);
    }
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters long`;
      if (field.errors['pattern']) {
        if (fieldName.includes('Name')) return 'Name should contain only letters and spaces';
        if (fieldName.includes('Phone')) return 'Please enter a valid phone number';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const names: {[key: string]: string} = {
      quickName: 'Name',
      quickEmail: 'Email',
      quickPhone: 'Phone Number',
      quickMessage: 'Message'
    };
    return names[fieldName] || fieldName;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  sendAnotherMessage() {
    this.showThankYou = false;
    this.submittedData = null;
    this.quickContactForm.reset();
  }
}
