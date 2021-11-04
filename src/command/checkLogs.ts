import { CommandInteraction, MessageEmbed, MessagePayload } from 'discord.js';

export const isCheckLogsCommand = (commandName: string) => {
	if (commandName.toLocaleLowerCase().trim() === 'checklogs') {
		return true;
	}

	return false;
};

// this is just a test for my personal server - these logs can't be accessed by this bot without
// your explicit granting of these permissions to your server when you add the bot (via oauth2 protocol)
export const checkLogsCommandHandler = async (interaction: CommandInteraction): Promise<void> => {
	const { commandName } = interaction;
	if (!isCheckLogsCommand(commandName)) { return; }
	const fetchedLogs = await interaction.guild.fetchAuditLogs({
		limit: 100,
		type: 41,
	});
	const embed = new MessageEmbed()
		.setColor('#a2e612')
		.setDescription('audit logs');

	for (const logLine of fetchedLogs.entries) {
		const [, entry] = logLine;
		embed.addField(entry.action, entry.actionType);
	}
	await interaction.reply(MessagePayload.create(interaction, { embeds: [embed] }));
};