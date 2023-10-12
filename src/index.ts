import 'dotenv/config';
import { Collection, GatewayIntentBits } from 'discord.js';

import { DiscordClient } from './structures/DiscordClient.js';
import { getCommands, getEvents } from './utils/loader.js';

const discord = new DiscordClient({ intents: [GatewayIntentBits.Guilds] });
discord.commands = new Collection();

await loadCommands();
await loadEvents();

void discord.login(process.env.DISCORD_TOKEN);

/**
 * Load Discord slash commands within a directory recursively.
 */
async function loadCommands(): Promise<void> {
    for (const command of await getCommands()) {
        discord.commands.set(command.data.name, command);
    }
}

/**
 * Load Discord events within a directory recursively.
 */
async function loadEvents(): Promise<void> {
    for (const event of await getEvents()) {
        if (event.once === true) {
            discord.once(event.type as string, async (...args) => {
                await event.execute(...args);
            });
        } else {
            discord.on(event.type as string, async (...args) => {
                await event.execute(...args);
            });
        }
    }
}
