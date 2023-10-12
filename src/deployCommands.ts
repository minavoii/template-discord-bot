import 'dotenv/config';
import { REST, Routes } from 'discord.js';

import { getCommands } from './utils/loader.js';

const arg = process.argv[2];

if (arg === '--server') await deploy(false);
else await deploy(true);

/**
 * Deploy slash commands globally or to a specific server.
 * @param global Should commands be deployed globally, or to a specific server?
 */
async function deploy(global: boolean): Promise<void> {
    const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

    if (DISCORD_TOKEN === undefined || DISCORD_TOKEN === '') {
        throw new Error("Could not find the bot's token.");
    }

    if (DISCORD_CLIENT_ID === undefined || DISCORD_CLIENT_ID === '') {
        throw new Error("Could not find the bot's client id.");
    }

    if (!global && (DISCORD_GUILD_ID === undefined || DISCORD_GUILD_ID === '')) {
        throw new Error("Could not find the guild's id.");
    }

    const rest = new REST().setToken(DISCORD_TOKEN);
    const commandsData = (await getCommands()).map((v) => v.data.toJSON());

    try {
        console.log(`Started refreshing ${commandsData.length} application commands.`);

        const data = global
            ? ((await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
                  body: commandsData,
              })) as object[])
            : ((await rest.put(
                  Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID as string),
                  {
                      body: commandsData,
                  }
              )) as object[]);

        console.log(`Successfully reloaded ${data.length} application commands.`);
    } catch (error) {
        console.error(error);
    }
}
