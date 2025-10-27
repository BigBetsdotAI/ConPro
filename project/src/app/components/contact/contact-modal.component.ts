import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactModalComponent {
  @Input() isModalOpen: boolean = false;
  @Input() quickContactForm: any;
  @Input() isSubmitting: boolean = false;
  @Input() showThankYou: boolean = false;
  @Input() submittedData: any = null;
  @Input() isFieldInvalid: any;
  @Input() getErrorMessage: any;
  @Input() closeContactForm: any;
  @Input() onSubmitQuickForm: any;
  @Input() sendAnotherMessage: any;
}
