module.exports = async (interaction) => {
  if (interaction.isCommand()) {
    console.log(`${interaction?.commandName} command interaction from ${interaction?.user?.tag} registered`)

    const commandName = interaction.commandName;
    const commandHandler = interaction.client.handlers.get(commandName);

    try {
      return await commandHandler.execute(interaction);
    } catch(e) {
      console.log(e);
    }
  }

  if (interaction.isButton()) {
    console.log(`${interaction?.customId} button interaction from ${interaction?.user?.tag} registered`);

    const interactionId = interaction.customId;
    const interactionHandler = interaction.client.handlers.get(interactionId);

    try {
      return await interactionHandler.execute(interaction);
    } catch(e) {
      console.log(e);
    }
  }
}