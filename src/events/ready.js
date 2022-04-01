module.exports = (client) => {
  console.log('Bot ready');
  client.loadComponents();
  client.loadCommands();
}