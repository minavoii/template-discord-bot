import type { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface SlashCommand {
    readonly data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
