import { statSync, readdirSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

import type { Event } from '../structures/interfaces/DiscordEvent.js';
import type { SlashCommand } from '../structures/interfaces/SlashCommand.js';

/**
 * Get Discord slash commands from their directory recursively.
 * @return Array of all slash commands.
 */
export async function getCommands(): Promise<SlashCommand[]> {
    return (await importObjects('commands', 'command')) as SlashCommand[];
}

/**
 * Get events from their directory recursively.
 * @return Array of all events.
 */
export async function getEvents(): Promise<Event[]> {
    return (await importObjects('events', 'event')) as Event[];
}

/**
 * Recursively import objects from .js files within a directory.
 * @param directory Relative path of the directory to load files from.
 * @param extractProperty The objects' property to return.
 * @returns An array of objects (or their properties) loaded from the .js files.
 */
async function importObjects(directory: string, extractProperty?: string): Promise<object[]> {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const fullSubDirectory = join(currentDir, directory);

    return await branch(fullSubDirectory);

    /**
     * Helper function to recursively import objects from .js files within a directory.
     * @param subDirectory Absolute path of the directory to load files from.
     * @returns An array of object (or their properties) loaded from the .js files.
     */
    async function branch(subDirectory: string): Promise<object[]> {
        const contents = readdirSync(subDirectory);
        const files = [];

        for (const fileOrDir of contents) {
            const path = join(subDirectory, fileOrDir);

            // Branch to subdirectory
            if (statSync(path).isDirectory()) {
                files.push(...(await branch(path)));
            }
            // Load file
            else if (fileOrDir.endsWith('.js')) {
                const relativePath = relative(currentDir, path);
                const obj = await import(`./${relativePath}`);

                if (extractProperty !== undefined) files.push(obj[extractProperty]);
                else files.push(obj);
            }
        }

        return files;
    }
}
