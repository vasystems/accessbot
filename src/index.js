const fs = require('fs');
const path = require('path');

const { Client, Collection, Intents } = require('discord.js');

const discordModal = require('discord-modals');

class DiscordBot extends Client {
  #token;
  #servers;

  constructor(token, servers) {
    console.log(`creating bot for ${token}`);
    super({ intents: [ Intents.FLAGS.GUILDS ] })
    discordModal(this);

    this.handlers = new Collection();

    this.#token = token;
    this.#servers = servers;

    this.login(this.#token);
    this.loadEvents();
  }

  getRoleByServerID(serverId) {
    return this.#servers[serverId].accessRole;
  }

  getNickSeparatorByServerID(serverId) {
    return this.#servers[serverId].separator;
  }

  loadEvents() {
    console.log('loading events')
    const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(fileName => { return fileName.endsWith('.js'); });

    eventFiles.forEach(fileName => {
      const eventHandler = require(`./events/${fileName}`);
      const eventName = fileName.split('.js')[0];

      this.on(eventName, eventHandler)
    })
  }

  loadComponents() {
    const buttons = fs.readdirSync(path.join(__dirname, 'components')).filter(fileName => { return fileName.endsWith('.js') });
    buttons.forEach(fileName => {
      const buttonInfo = require(`./components/${fileName}`);

      buttonInfo.data.components.forEach(component => {
        this.handlers.set(component.customId, buttonInfo);
      })
    });
  }

  async loadCommands() {
    console.log('loading commands...');
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(fileName => { return fileName.endsWith('.js') });

    const commands = commandFiles.map(fileName => {
      const commandInfo = require(`./commands/${fileName}`);
      commandInfo.data.setDefaultPermission(false);

      this.handlers.set(commandInfo.data.name, commandInfo);

      return commandInfo.data.toJSON();
    });

    Object.entries(this.#servers).forEach(async ([guildId, server]) => {
      console.log(guildId, server);
      const commandsSet = await this.application.commands.set(commands, guildId);
      commandsSet.each(command => {
        console.log('setting', server.permissionRole)
        command.permissions.set({
          permissions: [{
            id: server.permissionRole,
            type: 'ROLE',
            permission: true,
          }]
        })
      });
    });
  }
}

module.exports = DiscordBot;
