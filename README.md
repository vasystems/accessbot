# Access Bot
This is a bot specifically designed for the purpose of handling Discord access requests for vAMSYS virtual airlines.


## Configuration
To configure this bot, a `config` folder needs to be made in the root directory that contains the `src`, `index.js` and `README.md` files with the following files:

### discord.json
```js
[
  {
    "token": "", // Discord bot token
    "servers": {
      "814593341579722824": { // set to the guild ID
        "nickname": "Access Bot", // nickname for bot
        "permissionRole": "123456789012345678", // snowflake for the role that slash commands should be restricted to
        "accessRole": "123456789012345678", // snowflake for the role that should be assigned to users that have requested access
        "separator": " - " // the separator that should be used between the name and pilot ID in nicknames
      }
    }
  }
]
```

### vamsys.js
This file contians the vAMSYS API key that should be used by the bot.

```js
const VAMSYS_API_KEY = 'abcdefgh-ijkl-mnop-qrst-uvwxyz012345'

module.exports = VAMSYS_API_KEY;
```

## Installation
To install all dependencies required by the bot, run `npm install` in the root directory.
