import type { Events } from 'discord.js';

export interface Event {
    readonly type: Events;
    readonly once?: boolean;
    execute: (...args: any[]) => Promise<void>;
}
