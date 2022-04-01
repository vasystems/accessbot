# Access Bot
This is a bot specifically designed for the purpose of handling Discord access requests for vAMSYS virtual airlines.

## Configuration
To configure this bot, a `config` folder needs to be made in the root directory that contains the `src`, `index.js` and `README.md` files with the following file:

### discord.json
```js
{
  "vamsysKey": "", // 'abcdefgh-ijkl-mnop-qrst-uvwxyz012345'
  "discordToken": "", // Discord bot token
  "servers": {
    "012345678901234567": { // set to the guild ID
      "permissionRole": "012345678901234567", // snowflake for the role that slash commands should be restricted to
      "accessRole": "012345678901234567", // snowflake for the role that should be assigned to users that have requested access
      "separator": " - " // the separator that should be used between the name and pilot ID in nicknames
    }
  }
}
```

## Installation
To install all dependencies required by the bot, run `npm install` in the root directory.
