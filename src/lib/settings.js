import { settings } from "$lib/stores/settings";

export class Settings {

  constructor(data) {
    this.data = data;
  }

  get animations() {
    return this.data.animations;
  }
  set animations(value) {
    this.data.animations = value;
    settings.set(this.data);
  }

  get theme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

}
