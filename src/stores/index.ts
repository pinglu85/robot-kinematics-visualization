import { writable } from 'svelte/store';
import type { JointInfo } from '../types';

export const jointInfosStore = writable<JointInfo[]>([]);
