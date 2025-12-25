import { Injectable, signal, effect } from '@angular/core';
import { THEME_COLORS, THEME_SCHEMES, Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  readonly possibleColors = THEME_COLORS;
  readonly possibleSchemes = THEME_SCHEMES;
  #selectedColor = signal(this.possibleColors[0]);
  #selectedScheme = signal(this.possibleSchemes[0]);

  /**

   * The local storage key name used to save the theme that the user has chosen.  When the user
   * closes the browser local storage persists so the theme will remain.
   */
  private readonly localStorageThemeKey = 'ThemeName';

  /**

   * Constructor used to inject the services.  This will also load the theme from local storage
   * and then apply the theme that the user has saved.
   *

   * @param overlayContainer Used to get the theme class and remove it.
   */

  constructor() {
    let theme = this.currentTheme;
    const savedThemeString = localStorage.getItem(this.localStorageThemeKey);
    if (savedThemeString) {
      theme = JSON.parse(savedThemeString);
    }
    this.#selectedScheme.set(theme.scheme ?? this.#selectedScheme());
    this.#selectedColor.set(theme.color ?? this.#selectedColor());
    this.saveTheme(this.currentTheme);
    console.log ('currentTheme', this.currentTheme);
 
    // Apply the scheme
    effect(()=>{
      const schemes =  this.possibleSchemes.map(obj => obj.scheme);
      document.body.classList.remove(...schemes);
      document.body.classList.add(this.#selectedScheme().scheme);
      // console.log ('adding class', this.#selectedScheme().scheme);
    });

    // Apply the color
    effect(()=>{
      const colors = this.possibleColors.map(obj => obj.palette);
      document.body.classList.remove(...colors);
      document.body.classList.add(this.#selectedColor().palette);
      // console.log ('adding ', this.#selectedColor().palette)
    });
   }

  setColor(color: string) {
    const chosenColor = this.possibleColors.find(item => item.value === color);
    if (chosenColor) {
      this.#selectedColor.set(chosenColor);
    } else {
      console.error ('color not found', color);
      console.error ('possible colors', this.possibleColors);
    }
    this.saveTheme(this.currentTheme);
  }

  setScheme(name: string) {
    const chosenScheme = this.possibleSchemes.find(item => item.value === name);
    if (chosenScheme) {
      this.#selectedScheme.set(chosenScheme);
    }
    this.saveTheme(this.currentTheme);
  }

 
  private saveTheme(theme: Theme) {
    console.log ('currentTheme', this.currentTheme);    
    localStorage.setItem(this.localStorageThemeKey, JSON.stringify(theme));
  }

  get currentTheme(): Theme {
    return {color: this.#selectedColor(), scheme: this.#selectedScheme()};
  }

}

 