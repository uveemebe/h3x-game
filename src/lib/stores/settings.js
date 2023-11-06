import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import { Settings } from "$lib/settings.js";

const getSettingsData = () => {
    return JSON.parse(browser ? localStorage.settings ?? null : null);
}

export const settings = writable(new Settings(getSettingsData()));
settings.subscribe((settings) => {
    if (browser) {
        localStorage.settings = JSON.stringify(settings);
    }
});