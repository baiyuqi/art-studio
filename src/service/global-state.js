import { createStore } from 'state-pool';


export const store = createStore();  // Create store for storing our global state
store.setState("mynfts", [])
