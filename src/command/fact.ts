import { CommandInteraction, MessageEmbed, MessagePayload } from 'discord.js';
import { getRandomEntryFromArray } from '../utils';
import { pandaFacts } from './data/facts';

export const isFactCommand = (commandName: string) => {
	if (commandName.toLocaleLowerCase().trim() === 'pandafact') {
		return true;
	}

	return false;
};

export const factCommandHandler = async (interaction: CommandInteraction): Promise<void> => {
	const { commandName } = interaction;
	if (!isFactCommand(commandName)) { return; }
	const pandaFact = getRandomEntryFromArray(pandaFacts);
	const embed = new MessageEmbed()
		.setColor('#a2e612')
		.setDescription(pandaFact);
	await interaction.reply(MessagePayload.create(interaction, { embeds: [embed] }));
};