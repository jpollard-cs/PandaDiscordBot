import { CommandInteraction } from 'discord.js';

// eslint-disable-next-line no-unused-vars
export type CommandHandler = (interaction: CommandInteraction) => Promise<void>;

export const baseCommandHandler = async (interaction: CommandInteraction): Promise<void> => {
	if (!interaction.isCommand()) {
		return;
	}
};