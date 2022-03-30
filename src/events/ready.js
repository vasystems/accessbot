module.exports = (client) => {
  client.loadComponents();
  console.log('load commands');
  client.loadCommands();
}