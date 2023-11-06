import { settings } from "$lib/stores/settings";

const DEFAULT_DATA = {
  animations: true,
};
export class Settings {

  constructor(data) {
    this.data = data ?? DEFAULT_DATA;
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
