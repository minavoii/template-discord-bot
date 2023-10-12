import { Events } from 'discord.js';

import { log } from '../utils/logger.js';

import type { Event } from '../structures/interfaces/DiscordEvent.js';

export const event: Event = {
    type: Events.ClientReady,
    async execute() {
        log('Ready.');
    },
};
