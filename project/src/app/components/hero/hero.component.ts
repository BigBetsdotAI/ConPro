import { Component, HostListener, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" class="pt-24 pb-16 hero-parallax-bg min-h-screen bg-cover bg-center" #parallaxSection>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Slide 1 -->
          <ng-container *ngIf="currentSlide === 0">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight slide-in-left hero-heading" #slideLeft>
              Transform Your Business with
              <span class="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                Intelligent Solutions
              </span>
            </h1>
            <p class="text-xl text-white mb-8 leading-relaxed slide-in-right" #slideRight>
              We deliver cutting-edge AI and software solutions that drive innovation
              across healthcare, banking, and insurance industries.
            </p>
          </ng-container>

          <!-- Slide 2 -->
          <ng-container *ngIf="currentSlide === 1">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight slide-in-left hero-heading" #slideLeft>
              Let's Create
              <span class="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                Deep Creativity
              </span>
            </h1>
            <p class="text-xl text-white mb-8 leading-relaxed slide-in-right" #slideRight>
              Responsive and Retina Ready for All Devices — crafting experiences that convert.
            </p>
          </ng-container>

          <!-- Slide 3 -->
          <ng-container *ngIf="currentSlide === 2">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight slide-in-left hero-heading" #slideLeft>
              We Make
              <span class="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                Inspired Design
              </span>
            </h1>
            <p class="text-xl text-white mb-8 leading-relaxed slide-in-right" #slideRight>
              Is a New Design Studio founded in NewYork — modern branding and digital strategy.
            </p>
          </ng-container>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              (click)="scrollToSection('services')"
              class="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Explore Our Services
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform duration-200">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
            <button
              (click)="scrollToSection('contact')"
              class="bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <!-- Social icons (right side, vertically centered) -->
  <div class="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-1 z-40 hero-social">
        <a href="#" class="social-link facebook w-8 h-8 flex items-center justify-center rounded-full" aria-label="Facebook">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="#" class="social-link twitter w-8 h-8 flex items-center justify-center rounded-full" aria-label="Twitter">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.64a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 12.5 6.5a12.86 12.86 0 0 1-9.34-4.73 4.5 4.5 0 0 0 1.4 6A4.48 4.48 0 0 1 2 7.7v.06A4.5 4.5 0 0 0 6.5 12a4.5 4.5 0 0 1-2 .08 4.52 4.52 0 0 0 4.2 3.12A9.06 9.06 0 0 1 1 18.57 12.78 12.78 0 0 0 7 20.5c8.5 0 13.2-7 13.2-13 0-.2 0-.4 0-.6A9.4 9.4 0 0 0 23 3z"/>
          </svg>
        </a>
        <a href="#" class="social-link linkedin w-8 h-8 flex items-center justify-center rounded-full" aria-label="LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-14h4v2a4 4 0 0 1 4-2zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
          </svg>
        </a>
        <a href="#" class="social-link instagram w-8 h-8 flex items-center justify-center rounded-full" aria-label="Instagram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </a>
      </div>
      <!-- Left-side pager (01,02,03) -->
      <div class="fixed left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-start gap-4 z-40 hero-pager">
        <button (click)="goToSlide(0)" [class.active]="currentSlide === 0" class="pager-item text-white">01</button>
        <button (click)="goToSlide(1)" [class.active]="currentSlide === 1" class="pager-item text-white">02</button>
        <button (click)="goToSlide(2)" [class.active]="currentSlide === 2" class="pager-item text-white">03</button>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  currentSlide = 0;
  private ignoreScroll = false;
  private slideObserver: IntersectionObserver | null = null;
  private exitTimers: WeakMap<Element, number> = new WeakMap();
  private autoplayInterval: number | null = null;
  private userInteracted = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.handleParallax();
    // Parallax stays on scroll
    window.addEventListener('scroll', this.handleParallax.bind(this));
    window.addEventListener('scroll', this.updateCurrentSlide.bind(this));

    // Use IntersectionObserver to trigger slide-in when elements enter/exit viewport
  // widen the intersection window so the element is treated as "in view"
  // for a longer portion of scrolling (prevents quick hide during scroll)
  const options = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.15 };
    this.slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // entering viewport -> ensure visible and cancel any pending exit timers
          this.renderer.addClass(target, 'slide-in-visible');
          const t = this.exitTimers.get(target);
          if (t) { window.clearTimeout(t); this.exitTimers.delete(target); }
        } else {
          // leaving viewport -> schedule removal after short debounce so quick scrolls won't snap
          const timer = window.setTimeout(() => {
            this.renderer.removeClass(target, 'slide-in-visible');
            this.exitTimers.delete(target);
          }, 220);
          this.exitTimers.set(target, timer);
        }
      });
    }, options);

    // initial observe of elements (will re-observe when slide changes)
    this.observeSlideElements();

    // start autoplay
    this.startAutoplay();
  }

  goToSlide(index: number): void {
    // change slide content immediately (do not scroll)
    this.currentSlide = index;
    // temporarily ignore scroll-based updates so the user's click isn't overridden
    this.ignoreScroll = true;
    setTimeout(() => { this.ignoreScroll = false; }, 700);
    // small timeout to allow the DOM to render the new slide, then observe its slide-in elements
    setTimeout(() => this.observeSlideElements(), 30);
    // mark that the user interacted and pause autoplay briefly
    this.userInteracted = true;
    this.pauseAutoplayTemporarily();
  }

  updateCurrentSlide(): void {
    if (this.ignoreScroll) return;
    const section = this.el.nativeElement.querySelector('.hero-parallax-bg');
    if (!section) return;
    const scrollY = window.scrollY + window.innerHeight / 2;
    const start = section.offsetTop;
    const height = section.clientHeight;
    const rel = Math.max(0, Math.min(2, Math.floor((scrollY - start) / height)));
    if (rel !== this.currentSlide) {
      this.currentSlide = rel;
      // When slide changes due to scroll, the DOM updates; observe new elements so animations can run
      setTimeout(() => this.observeSlideElements(), 30);
    }
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  handleParallax(): void {
    const section = this.el.nativeElement.querySelector('.hero-parallax-bg');
    if (section) {
      const scrollY = window.scrollY;
      section.style.backgroundPosition = `center ${scrollY * 0.3}px`;
    }
  }

  private observeSlideElements(): void {
    if (!this.slideObserver) return;
  // disconnect previous observes to allow re-triggering
  this.slideObserver.disconnect();
  const left = this.el.nativeElement.querySelector('.slide-in-left');
  const right = this.el.nativeElement.querySelector('.slide-in-right');
  // remove the visible class so the animation can run again when the element intersects
  if (left) this.renderer.removeClass(left, 'slide-in-visible');
  if (right) this.renderer.removeClass(right, 'slide-in-visible');
  if (left) this.slideObserver.observe(left);
  if (right) this.slideObserver.observe(right);
  }

  // Autoplay helpers
  private startAutoplay(): void {
    // every 10 seconds advance slide unless user recently interacted
    this.clearAutoplay();
    this.autoplayInterval = window.setInterval(() => {
      if (this.userInteracted) return; // don't advance immediately after user interaction
      this.currentSlide = (this.currentSlide + 1) % 3;
      // observe to trigger animations
      setTimeout(() => this.observeSlideElements(), 30);
    }, 4000);
  }

  private pauseAutoplayTemporarily(): void {
    // stop autoplay for a while after user interaction
    this.userInteracted = true;
    if (this.autoplayInterval) { window.clearInterval(this.autoplayInterval); this.autoplayInterval = null; }
    // resume after 12s of inactivity
    window.setTimeout(() => {
      this.userInteracted = false;
      this.startAutoplay();
    }, 12000);
  }

  private clearAutoplay(): void {
    if (this.autoplayInterval) { window.clearInterval(this.autoplayInterval); this.autoplayInterval = null; }
  }

  // pause while hovering
  onMouseEnter(): void { this.userInteracted = true; this.clearAutoplay(); }
  onMouseLeave(): void { this.userInteracted = false; this.startAutoplay(); }

  ngOnDestroy(): void { this.clearAutoplay(); if (this.slideObserver) this.slideObserver.disconnect(); }

  handleSlideIn(): void {
    // deprecated - IntersectionObserver now handles slide-in toggling
    return;
  }
}
