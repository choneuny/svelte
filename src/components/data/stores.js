import { writable, readable } from "svelte/store";

let apps = ["chart", "news", "stock", "develop", "history"];

export const round = writable(0);
export const next_round = () => round.update((x) => x + 1);
