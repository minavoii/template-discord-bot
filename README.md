# Discord bot template

This template is based on [discordjs.guide](https://discordjs.guide).  
Documentation for discord.js can be found [here](https://discord.js.org/#/docs/discord.js/main/general/welcome).

## This template includes:

### Slash commands

-   `ping`: answers with the time it took to reply, the websocket's average latency, and the bot's uptime.

### Events

-   `ready`: fired once the bot is logged in.
-   `interactionCreate`: fired once a user runs a slash command.

### Scripts

-   `npm run deploy-commands`: updates slash commands globally.
-   `npm run deploy-commands-server`: updates slash commands inside the server specified by `env.DISCORD_GUILD_ID`.
-   `node build`: runs the bot.
