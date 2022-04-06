module.exports = async (client) => {
  console.log('Bot ready');
  const correctRoleConfig = await client.checkRoleConfiguration();

  if (!correctRoleConfig) throw new Error('Role configuration is incorrect. Bot will not work.')

  console.log('Roles are configured correctly');

  await client.loadComponents();
  await client.loadCommands();
}