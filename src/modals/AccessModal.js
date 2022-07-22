const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { AIRLINE_ID } = require('../constants/configuration');

const ModalResponse = require("../structures/ModalResponse");
const VamsysUser = require("../structures/VamsysUser");

/**
 * Create input row for the pilot ID
 */
const pilotIdRow = new ActionRowBuilder()
  .addComponents(
    new TextInputBuilder()
      .setCustomId('pilot-id')
      .setLabel('Pilot ID')
      .setStyle(TextInputStyle.Short)
      .setMinLength(7)
      .setMaxLength(8)
      .setPlaceholder(`${AIRLINE_ID}0001`)
      .setRequired(true),
  )

/**
 * Create input row for the name
 */
const nameRow = new ActionRowBuilder()
  .addComponents(
    new TextInputBuilder()
    .setCustomId('name')
    .setLabel('Name')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Barry Scott')
    .setRequired(true)
  )

const ACCESS_REQUEST_MODAL = {
 data: new ModalBuilder()
  .setCustomId('access-form')
  .addComponents([
    pilotIdRow,
    nameRow
  ]),
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      const userResponse = new ModalResponse(interaction);
      const pilotId = userResponse.pilotId.toUpperCase();

      const vamsysUser = await VamsysUser.fromPilotId(userResponse.pilotId);

      if (!vamsysUser.exists || !vamsysUser.doesNameMatch(userResponse.name)) {
        console.log(`${interaction?.user?.tag} rejected access`)
        return await interaction.followUp({content: 'Your details were incorrect. Please try again, ensuring that you have entered your details exactly as requested above.', ephemeral: true});
      }

      console.log(`${interaction?.user?.tag} granted access`)

      const nickname = userResponse.sanitisedName;
      const separator = interaction.client.getNickSeparatorByServerID(interaction.guildId);

      await interaction.member.setNickname(`${nickname}${separator}${pilotId}`);
      await interaction.member.roles.add(interaction.client.getRoleByServerID(interaction.guildId));
      await interaction.followUp({content: `Welcome to ${interaction.guild.name}!`});
    } catch(e) {
      console.log(e);
      if (!interaction.deferred) await interaction.deferReply({ ephemeral: true });
      await interaction.followUp('There was an error whilst handling your submission. Please try again later.');
    }
  }
}

module.exports = ACCESS_REQUEST_MODAL;
