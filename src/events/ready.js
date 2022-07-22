module.exports = async (client) => {
  console.log('Client ready');
  const correctRoleConfig = await client.checkRoleConfiguration();

  if (!correctRoleConfig) throw new Error('Role configuration is incorrect. Bot will not work.')

  console.log('Roles are configured correctly');
  
  await client.loadCommands();
  await client.loadComponents();
  await client.loadModals();

  console.log('Bot ready');
}