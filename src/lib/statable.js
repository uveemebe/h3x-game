export const STATES = {
  ENABLED: "enabled",
  SELECTED: "selected",
  PRESSED: "pressed",
  LOCKED: "locked",
  FOUND: "found"
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
  get found() {
    return this.states.has(STATES.FOUND);
  }
  get pressed() {
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
  set found(value) {
    value ? this.states.add(STATES.FOUND) : this.states.delete(STATES.FOUND);
  }

  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }

  lock(found = false) {
    this.locked = true;
    this.found = found;
    this.enabled = false;
  }
  unlock() {
    this.locked = false;
  }

  select() {
    this.selected = true;
  }
  deselect() {
    this.selected = false;
  }

  get state() {
      return Array.from(this.states).join(" ");
  }

}