import { SlashCommandBuilder } from 'discord.js';

import type { SlashCommand } from '../structures/interfaces/SlashCommand.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const command: SlashCommand = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Shows latency and uptime'),
    async execute(interaction: ChatInputCommandInteraction) {
        const reply = await interaction.reply({ content: 'Ping...', fetchReply: true });

        const uptime = interaction.client.uptime;
        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 60;

        await interaction.editReply(
            `**Pong**: ${reply.createdTimestamp - interaction.createdTimestamp}ms.\n` +
                `**API Latency**: ${Math.round(interaction.client.ws.ping)}ms\n` +
                `**Uptime**: ${days}d ${hours}h ${minutes}m ${seconds}s`
        );
    },
};
