import { Client, Collection } from 'discord.js';

import type { SlashCommand } from './interfaces/SlashCommand.js';

/**
 * A Discord client with an integrated collection of commands.
 */
export class DiscordClient extends Client {
    commands = new Collection<string, SlashCommand>();
}
