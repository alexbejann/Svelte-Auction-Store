import { writable } from 'svelte/store'

export let books = writable([]);

export let userBids = writable([]);