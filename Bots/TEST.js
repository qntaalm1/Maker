const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents } = require("discord.js");
const Discord = require('discord.js');
const client = new Client({ intents: 32767 });
const { Database } = require("st.db")
const db2 = new Database("/Json-tokens/Tokens.json")
const taxdb = new Database("/Json-db/TaxDB.json")
let tax = db2.get('5') || []
const embedscolor = '#000000';


tax.forEach(data => {
  const { Intents, Client, Collection, MessageEmbed, WebhookClient, MessageButton, MessageActionRow, MessageSelectMenu, MessageAttachment, TextInputComponent, Modal } = require(`discord.js`)
  const { REST } = require("@discordjs/rest")
  const { Routes } = require("discord-api-types/v9")
  let prefix = data.prefix
  const Discord = require("discord.js")
process.on('unhandledRejection', (reason, p) => {
  return;
});
process.on('uncaughtException', (err, origin) => {
  return;
  });
process.on('uncaughtExceptionMonitor', (err, origin) => {
  return;

});
process.on('warning', (warning) => {
  return;
});
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    partials: ["REACTION", "MESSAGE", "CHANNEL"]
  });
  const botowner = data.owner;
  client.on('ready', () => {
    const statuses = [`My prefix ${prefix}`, `Auto-Tax bot`];
    const timers = 1;
    const timeing = Math.floor(timers * 1000);
    setInterval(function () {
      const lengthesof = statuses.length;
      const status = Math.floor(Math.random() * lengthesof);
      client.user.setStatus("idle")
      client.user.setActivity(statuses[status], { type: `WATCHING` });
    }, timeing);
  });






  client.on(`messageCreate`, m =>{
    if(m.content === "TEST"){
        return m.reply(`Working`)
    }
})


  client.login(data.token).catch(() => {
    console.log(`TEST token ${data.BotID} not working`)
  })
})
