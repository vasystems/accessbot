module.exports = async (interaction) => {
  if (interaction.isCommand()) {
    const commandName = interaction.commandName;
    const commandHandler = interaction.client.handlers.get(commandName);

    try {
      return await commandHandler.execute(interaction);
    } catch(e) {
      console.log(e);
    }
  }

  if (interaction.isButton()) {
    const interactionId = interaction.customId;
    const interactionHandler = interaction.client.handlers.get(interactionId);

    try {
      return await interactionHandler.execute(interaction);
    } catch(e) {
      console.log(e);
    }
  }
}