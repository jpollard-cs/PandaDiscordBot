require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.TEST_GUILD_ID;

// todo have this populate dynamically here and in global command file
// investigate using discordx library
const commands = [
	// new SlashCommandBuilder().setName('pandajoke').setDescription('Replies with a panda joke!'),
	// new SlashCommandBuilder().setName('pandafact').setDescription('Replies with a panda fact!'),
	// new SlashCommandBuilder().setName('pandaprediction').setDescription('Replies with a panda prediction!'),
	new SlashCommandBuilder().setName('checklogs').setDescription('replies with audit logs'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

// rest.get(Routes.applicationGuildCommands(clientId, guildId))
// 	.then(data => {
// 		const promises = [];
// 		for (const command of data) {
// 			const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
// 			console.log(deleteUrl);
// 			promises.push(rest.delete(deleteUrl));
// 		}
// 		return Promise.all(promises);
// 	})
// 	.then(rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands }))
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
