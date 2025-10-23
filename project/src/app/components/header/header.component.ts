import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header [class.bg-white]="isScrolled" [class.shadow-md]="isScrolled" class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div [ngClass]="isScrolled ? 'text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent' : 'text-2xl font-bold text-white'">
              A2 Intelligence
            </div>
          </div>

          <nav class="hidden md:flex space-x-8">
            <button
              (click)="scrollToSection('services')"
              [ngClass]="isScrolled ? 'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium' : 'text-white hover:text-white/90 transition-colors duration-200 font-medium'"
            >
              Services
            </button>
            <button
              (click)="scrollToSection('products')"
              [ngClass]="isScrolled ? 'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium' : 'text-white hover:text-white/90 transition-colors duration-200 font-medium'"
            >
              Products
            </button>
            <button
              (click)="scrollToSection('industries')"
              [ngClass]="isScrolled ? 'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium' : 'text-white hover:text-white/90 transition-colors duration-200 font-medium'"
            >
              Industries
            </button>
            <button
              (click)="openContactPage()"
              [ngClass]="isScrolled ? 'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium' : 'text-white hover:text-white/90 transition-colors duration-200 font-medium'"
            >
              Get In Touch
            </button>
          </nav>

          <button
            class="ml-4"
            [ngClass]="isScrolled ? 'text-gray-700' : 'text-white'"
            (click)="toggleMenu()"
            aria-label="Toggle menu"
          >
            <svg *ngIf="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
            <svg *ngIf="isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

  <!-- Full-screen side menu overlay (visible on all viewports) -->
  <div *ngIf="isMenuOpen" class="fixed inset-0 z-50">
          <!-- backdrop -->
          <div class="absolute inset-0 bg-black/40" (click)="closeMenu()"></div>

          <!-- menu panel: full width on small screens, narrower right panel on md+ -->
          <div class="absolute inset-0 flex">
            <div class="ml-auto w-11/12 sm:w-4/5 md:w-1/3 max-w-[420px] bg-gradient-to-br from-blue-500 to-cyan-400 flex flex-col">
              <div class="flex justify-end p-6">
                <button (click)="closeMenu()" aria-label="Close menu" class="text-white/90 hover:text-white bg-white/10 rounded-full p-3 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>

              <div class="flex-1 flex flex-col justify-center items-start px-10 space-y-6">
                <button (click)="scrollToSection('services')" class="text-white text-xl font-medium text-left">Services</button>
                <button (click)="scrollToSection('products')" class="text-white text-xl font-medium text-left">Products</button>
                <button (click)="scrollToSection('industries')" class="text-white text-xl font-medium text-left">Industries</button>
                <button (click)="openContactPage()" class="text-white text-xl font-medium text-left">Get In Touch</button>
              </div>

              <div class="p-6">
                <div class="flex items-center gap-6 text-white/90 text-sm">
                  <a href="#" class="flex flex-col items-center hover:underline" aria-label="Facebook">
                    <!-- Facebook SVG -->
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-1">
                      <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" fill="currentColor"/>
                    </svg>
                    <span>Facebook</span>
                  </a>

                  <a href="#" class="flex flex-col items-center hover:underline" aria-label="Twitter">
                    <!-- Twitter SVG -->
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-1">
                      <path d="M22 5.924c-.63.28-1.306.47-2.016.556.725-.434 1.28-1.122 1.543-1.941-.678.402-1.429.694-2.228.852C18.67 4.58 17.62 4 16.44 4c-1.936 0-3.504 1.57-3.504 3.507 0 .275.03.543.09.8C9.723 8.19 6.176 6.36 4.036 3.615c-.302.52-.476 1.125-.476 1.767 0 1.219.62 2.294 1.56 2.924-.576-.018-1.118-.176-1.592-.44v.044c0 1.702 1.21 3.12 2.813 3.444-.294.08-.603.123-.922.123-.226 0-.447-.02-.662-.062.447 1.397 1.747 2.414 3.285 2.443-1.204.945-2.72 1.51-4.37 1.51-.284 0-.563-.017-.837-.05C6.952 20.29 9.6 21 12.38 21c7.225 0 11.18-6.02 11.18-11.235 0-.17-.004-.34-.012-.508.766-.548 1.432-1.233 1.958-2.016-.703.312-1.46.523-2.248.618z" fill="currentColor"/>
                    </svg>
                    <span>Twitter</span>
                  </a>

                  <a href="#" class="flex flex-col items-center hover:underline" aria-label="Instagram">
                    <!-- Instagram SVG -->
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-1">
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 7a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="currentColor"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
                <div class="mt-6 text-white/80 text-sm">
                  © 2019-2025 A2 Intelligence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;
  constructor(private router: Router) {}


  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY || window.pageYOffset;
    // if we've scrolled more than half the viewport, mark header as scrolled
    this.isScrolled = scrollY > (window.innerHeight * 0.5);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // lock background scroll when menu is open
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  scrollToSection(id: string): void {
    // Attempt to scroll to the element if it exists on the current page.
    // If not present, navigate to the app root with a hash so the browser
    // can scroll to it after navigation.
    try {
      const rawPath = window.location.pathname || '/';
      // normalize common root variants (strip index.html and trailing slash)
      const normalized = rawPath.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (normalized === '/' || normalized === '') {
        // We're on the root but element not present yet (maybe rendered later) — set the hash
        // which will allow browser-native scrolling when the element appears.
        window.location.hash = id;
        // Try a short delayed attempt in case element is rendered after a small timeout.
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 500);
      } else {
        // Not on root — navigate to root with fragment. Use base href if present so
        // apps hosted on a sub-path still work.
        const baseTag = document.querySelector('base');
        const baseHref = baseTag?.getAttribute('href') ?? '/';
        // Ensure there's a single slash between base and fragment
        const target = (baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref) + '/#' + id;
        window.location.href = target;
      }
    } catch (err) {
      // Last-resort fallback
      window.location.hash = id;
    } finally {
      this.isMenuOpen = false;
    }
  }

  openContactPage(): void {
    // Use Angular Router to navigate within the SPA (no full page reload)
    try {
      this.router.navigate(['/contact']);
    } catch (err) {
      // Fallback to location change if router is unavailable
      const baseTag = document.querySelector('base');
      const baseHref = baseTag?.getAttribute('href') ?? '/';
      const target = (baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref) + '/contact-page.html';
      window.location.href = target;
    } finally {
      this.isMenuOpen = false;
    }
  }
}
