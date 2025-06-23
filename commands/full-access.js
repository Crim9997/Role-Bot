import { SlashCommandBuilder } from 'discord.js';
import { ownsShirt } from '../utils/robloxChecker.js';
import config from '../config.json' assert { type: 'json' };

export const data = new SlashCommandBuilder()
  .setName('full-access')
  .setDescription('Verify for Full Access role')
  .addStringOption(option =>
    option.setName('roblox_user')
      .setDescription('Your Roblox username')
      .setRequired(true));

export async function execute(interaction) {
  if (interaction.guildId !== config.guildId) {
    return interaction.reply({ content: '❌ This command only works in the official server.', ephemeral: true });
  }

  const username = interaction.options.getString('roblox_user');
  await interaction.deferReply({ ephemeral: true });

  const hasShirt = await ownsShirt(username, config.shirts.full);

  if (hasShirt) {
    const role = interaction.guild.roles.cache.get(config.roles.full);
    await interaction.member.roles.add(role);
    await interaction.editReply(`✅ Verified! Role **${role.name}** has been added.`);
  } else {
    await interaction.editReply('❌ You do not own the required shirt.');
  }
}
