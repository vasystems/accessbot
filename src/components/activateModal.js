const { MessageActionRow, MessageButton } = require('discord.js');
const { showModal } = require('discord-modals');

const ACCESS_REQUEST_MODAL = require('../templates/AccessModal');

module.exports = {
  data: new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('activate-modal')
        .setLabel('Request Access')
        .setStyle('PRIMARY')
    ),
  async execute(interaction) {
    switch(interaction.customId) {
      case 'activate-modal':
        const modalToDisplay = ACCESS_REQUEST_MODAL;
        modalToDisplay.setTitle(`Request access to ${interaction.guild.name}`)

        showModal(ACCESS_REQUEST_MODAL, {
          client: interaction.client,
          interaction: interaction,
        });
        break;
      default:
        console.log(`Button interaction for ${interaction.customID} was not handled.`)
    }
  }
}
