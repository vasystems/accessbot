const fs = require('fs');
const path = require('path');

const { Client, Collection, Intents } = require('discord.js');

const discordModal = require('discord-modals');

class DiscordBot extends Client {
  #token;
  #servers;

  constructor(token, servers) {
    console.log(`Creating new Discord bot for ${token.substr(-8)}`);
    super({ intents: [ Intents.FLAGS.GUILDS ] })
    discordModal(this);

    this.handlers = new Collection();

    this.#token = token;
    this.#servers = servers;

    this.login(this.#token);
    this.loadEvents();
  }

  async checkRoleConfiguration() {
   const roleConfigurations = await Promise.all([...Object.keys(this.#servers)].map(async (guildId) => {
      const guild = await this?.guilds.fetch(guildId);

      const botRole = guild.roles.botRoleFor(this.user.id);
      const accessRole = this.getRoleByServerID(guildId);

      const roleComparison = guild.roles.comparePositions(botRole, accessRole);

      if (roleComparison < 0) {
        console.log(`Access role is lower in the role hierachy in comparison to the bot's role. The bot role needs to be moved higher in the role hierarchy settings for the server.`)
        return false;
      }

      return true;
    }));

    return await !roleConfigurations.includes(false);
  }

  /**
   * Gets the Discord role that should be added to users that have been granted access, by server ID
   * @param {Snowflake} serverId
   * @returns {Snowflake}
   */
  getRoleByServerID(serverId) {
    return this.#servers[serverId].accessRole;
  }

  /**
   * Gets the separator that should be used in nicknames for a server
   * @param {Snowflake} serverId
   * @returns {string}
   */
  getNickSeparatorByServerID(serverId) {
    return this.#servers[serverId].separator;
  }

  /**
   * Loads Discord '.on' events
   */
  loadEvents() {
    console.log('Loading events...')
    const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(fileName => { return fileName.endsWith('.js'); });

    eventFiles.forEach(fileName => {
      const eventHandler = require(`./events/${fileName}`);
      const eventName = fileName.split('.js')[0];

      this.on(eventName, eventHandler)
    })
  }

  /**
   * Adds components to Discord client for reference and easier component interaction handling
   */
  loadComponents() {
    console.log('Loading components...')
    const buttons = fs.readdirSync(path.join(__dirname, 'components')).filter(fileName => { return fileName.endsWith('.js') });
    buttons.forEach(fileName => {
      const buttonInfo = require(`./components/${fileName}`);

      buttonInfo.data.components.forEach(component => {
        this.handlers.set(component.customId, buttonInfo);
      })
    });
  }

  /**
   * Loads slash commands
   */
  async loadCommands() {
    console.log('Loading commands...');
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(fileName => { return fileName.endsWith('.js') });

    const commands = commandFiles.map(fileName => {
      const commandInfo = require(`./commands/${fileName}`);
      commandInfo.data.setDefaultPermission(false);

      this.handlers.set(commandInfo.data.name, commandInfo);

      return commandInfo.data.toJSON();
    });

    Object.entries(this.#servers).forEach(async ([guildId, server]) => {
      console.log('Registering commands...')
      const commandsSet = await this.application.commands.set(commands, guildId);
      commandsSet.each(command => {
        console.log('Setting permissions for commands to', server.permissionRole)
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
