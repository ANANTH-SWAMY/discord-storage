const fs = require("fs")
const express = require("express")
const { Client, Events, GatewayIntentBits } = require("discord.js")
require('dotenv').config()

// Express
const app = express()

app.get("/",(req, res) => {
	res.send("Hello World")
})

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})


// Discord
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]
})

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		return interaction.reply('Pong!');
	}
});

client.login(process.env.TOKEN);
