import { browser } from "$app/environment"
import type { Writable } from "svelte/store"

// tutorial: https://franknoirot.co/posts/svelte-kit-stores-localstorage

// Get value from localStorage if in browser and the value is stored, otherwise fallback
export function fromLocalStorage(storageKey: string, fallbackValue: any) {
	if (browser) {
		const storedValue = window.localStorage.getItem(storageKey)
		
		if (storedValue !== 'undefined' && storedValue !== null) {
			return (typeof fallbackValue === 'object') 
				? JSON.parse(storedValue)
				: storedValue
		}
	}
	
	return fallbackValue
}

export function toLocalStorage(store:Writable<any>, storageKey: string) {
	if (browser) {
		store.subscribe((value) => {
			let storageValue = (typeof value === 'object') 
				? JSON.stringify(value)
				: value
				
			window.localStorage.setItem(storageKey, storageValue)
		})
	}
}