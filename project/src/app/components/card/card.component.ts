import { Component, Input, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div tabindex="0" class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-[430px] flex flex-col p-0 slide-in-card card-3d" #cardRoot>
      <!-- card-inner will rotate in 3D to reveal the back face -->
      <div class="card-inner w-full h-full relative">
        <!-- FRONT FACE -->
        <div class="card-face card-front w-full h-full">
          <!-- Card Photo (replace with your image source) -->
          <img
            [src]="cardImageUrl"
            [alt]="title"
            class="w-full h-48 object-cover rounded-t-2xl block"
            (error)="onImgError($event)"
          />
          <div class="p-6 w-full flex flex-col items-start flex-1">
            <span class="text-xl font-bold text-gray-800 mb-3">{{ title }}</span>
            <span class="text-gray-600 leading-relaxed">{{ description }}</span>
          </div>
        </div>

        <!-- BACK FACE -->
        <div class="card-face card-back w-full h-full bg-gradient-to-b from-white to-gray-50 p-6 flex flex-col items-start justify-center">
          <span class="text-xl font-bold text-gray-900 mb-3">{{ title }}</span>
          <p class="text-gray-700 leading-relaxed mb-4">{{ description }}</p>
          <a class="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded-lg" href="#contact">Get in touch</a>
        </div>
      </div>
    </div>
  `
})
export class CardComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input() disableAnimation: boolean = false;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement.querySelector('.slide-in-card') as HTMLElement;
    if (!root) return;

    // If animation was explicitly disabled, opt out immediately
    if (this.disableAnimation) {
      this.renderer.addClass(root, 'no-anim');
      this.renderer.addClass(root, 'slide-in-visible');
      return;
    }

    // Enforce flip animation only inside the Services section.
    // If the card is not inside '#services' or '.services-warm', opt-out to prevent flips elsewhere.
    const servicesAncestor = root.closest('#services, .services-warm');
    if (!servicesAncestor) {
      this.renderer.addClass(root, 'no-anim');
      this.renderer.addClass(root, 'slide-in-visible');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(root, 'slide-in-visible');
        } else {
          this.renderer.removeClass(root, 'slide-in-visible');
        }
      });
    }, { threshold: 0.12 });
    observer.observe(root);
  }
  @Input() iconSvg: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() gradient: string = 'from-blue-500 to-cyan-600';
  @Input() photoUrl: string = '';

  get cardImageUrl(): string {
    return this.photoUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80';
  }
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80';
  }
}
