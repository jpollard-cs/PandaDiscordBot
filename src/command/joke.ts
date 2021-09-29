import { CommandInteraction, MessageEmbed, MessagePayload } from 'discord.js';
import { getRandomEntryFromArray } from '../utils';

import { pandaJokes } from './data/jokes';

export const isJokeCommand = (commandName: string) => {
	if (commandName.toLocaleLowerCase().trim() === 'pandajoke') {
		return true;
	}

	return false;
};

export const jokeCommandHandler = async (interaction: CommandInteraction): Promise<void> => {
	const { commandName } = interaction;
	if (!isJokeCommand(commandName)) { return; }
	const pandajoke = getRandomEntryFromArray(pandaJokes);
	const embed = new MessageEmbed()
		.setColor('#a2e612')
		.addField(pandajoke.title, pandajoke.body);
	await interaction.reply(MessagePayload.create(interaction, { embeds: [embed] }));
};