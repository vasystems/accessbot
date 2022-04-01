const { SlashCommandBuilder } = require('@discordjs/builders');

const ACCESS_REQUEST_MODAL = require('../components/activateModal').data;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createrequestbutton')
    .setDescription('Creates a request access button in the current channel.'),
  async execute(interaction) {
    console.log(`Handling createRequestButton command for ${interaction?.user?.tag}`)

    await interaction.deferReply();
    await interaction.channel.send({ components: [ ACCESS_REQUEST_MODAL ] });
    await interaction.deleteReply();
  }
}
