export const STATES = {
  ENABLED: "enabled",
  SELECTED: "selected",
  PRESSED: "pressed",
  LOCKED: "locked"
};

export class Statable {

  constructor(states) {
      this.states = new Set(states ?? []);
  }

  get selected() {
    return this.states.has(STATES.SELECTED);
  }
  get enabled() {
    return this.states.has(STATES.ENABLED);
  }
  get locked() {
    return this.states.has(STATES.LOCKED);
  }
  get clicked() {
    return this.states.has(STATES.PRESSED);
  }

  set selected(value) {
    value ? this.states.add(STATES.SELECTED) : this.states.delete(STATES.SELECTED);
  }
  set enabled(value) {
    value ? this.states.add(STATES.ENABLED) : this.states.delete(STATES.ENABLED);
  }
  set locked(value) {
    value ? this.states.add(STATES.LOCKED) : this.states.delete(STATES.LOCKED);
  }
  press() {
    this.states.add(STATES.PRESSED);
    setTimeout(() => this.states.delete(STATES.PRESSED), 1000);
  }

  get state() {
      return Array.from(this.states).join(" ");
  }

}