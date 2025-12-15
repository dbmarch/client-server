import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { THEME_COLORS } from '../models/theme-colors.model';
import { THEME_SCHEMES } from '../models/theme-scheme.model';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly #document = inject(DOCUMENT);
  readonly possibleColors = THEME_COLORS;
  readonly possibleSchemes = THEME_SCHEMES;
  readonly #selectedColor = signal(this.possibleColors[0]);
  readonly #selectedScheme = signal(this.possibleSchemes[0]);

  readonly selectedColor = this.#selectedColor.asReadonly();
  readonly selectedScheme = this.#selectedScheme.asReadonly();

  readonly #primary = computed(() => this.selectedColor().primary);
  readonly #accent = computed(() => this.selectedColor().accent);
  readonly #scheme = computed(() => this.selectedScheme().value);

  setColor(name:string) {
    const item = this.possibleColors.find(c => c.name === name);
    if (item) {
      this.#selectedColor.set(item);
    }
  }

  setScheme(name: string) {
    const item = this.possibleSchemes.find(s => s.value === name);
    if (item) {
      this.#selectedScheme.set(item);
    }
  }

  constructor() {
    effect(() => {
      this.#document.body.style.setProperty('--theme-primary', this.#primary());
   });
    effect(() => {
      this.#document.body.style.setProperty('--theme-accent', this.#accent());
   });
    effect(() => {
      console.log ('Setting color scheme to', this.#scheme());
      this.#document.body.style.setProperty('color-scheme', this.#scheme());
   });
}}