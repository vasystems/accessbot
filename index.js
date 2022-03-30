const tokenInfo = require('./config/discord.json');
const DiscordBot = require('./src');


async function start() {
  const bots = [];
  tokenInfo.forEach(async tokenDetails => {
    try {
      console.log(`making bot for ${tokenDetails.token}`)
      const bot = new DiscordBot(tokenDetails.token, tokenDetails.servers);
      bots.push(bot);
    } catch(e) {
      console.log(e)
    }
  })
}

start();
