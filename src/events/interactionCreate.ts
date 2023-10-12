import { Events } from 'discord.js';

import type { DiscordClient } from '../structures/DiscordClient.js';
import type { Event } from '../structures/interfaces/DiscordEvent.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const event: Event = {
    type: Events.InteractionCreate,
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const discord = interaction.client as DiscordClient;
        const command = discord.commands.get(interaction.commandName);

        if (command === undefined) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    },
};
