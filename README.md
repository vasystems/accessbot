# Access Bot
This is a bot specifically designed for the purpose of handling Discord access requests for vAMSYS virtual airlines.

## Configuration
To configure this bot, a `config` folder needs to be made in the root directory that contains the `src`, `index.js` and `README.md` files with the following file:

### config.json
```js
{
  "airlineID": "", // prefix for pilot ID usernames in the serve
  "vamsysKey": "", // 'abcdefgh-ijkl-mnop-qrst-uvwxyz012345'
  "discordToken": "", // Discord bot token
  "servers": {
    "012345678901234567": { // set to the guild ID
      "accessRoleId": ["012345678901234567"], // snowflake for the role that should be assigned to users that have requested access - comma separate roles for multiple roles to be assigned (eg. ["012345678901234567", "765432109876543210"])
      "nickSeparator": " - ", // the separator that should be used between the name and pilot ID in nicknames
      "roleRemoval": { // section for configuration of the removal of role(s) when a pilot joins a server
        "enabled": true, // set this to true if a role needs to be removed when a user is given access to the server, and false if not
        "roleId": ["012345678901234567"] // if role removal is enabled above, set this to the snowflake of the role(s) that need to be removed when a user is given access; comma separate roles for multiple roles to be removed (eg. ["012345678901234567", "765432109876543210"])
      }
    }
  }
}
```

## Installation
To install all dependencies required by the bot, run `npm install` in the root directory.

## Need help?
This bot was created for the use of [vEXS](https://vexs.uk), a virtual airline hosted on vAMSYS that simulates the real world operations of Jet2.com.

For any assistance with configuring the bot, or any other queries at all, please contact [webmaster@vexs.uk](mailto:webmaster@vexs.uk).
