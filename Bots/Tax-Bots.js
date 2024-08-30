const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents } = require("discord.js");
const Discord = require('discord.js');
const client = new Client({ intents: 32767 });
const { Database } = require("st.db")
const db2 = new Database("/Json-tokens/Tokens.json")
const taxdb = new Database("/Json-db/TaxDB.json")
let tax = db2.get('tax') || []
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

  client.on('messageCreate', async (message) => {
    if (message.content.startsWith(`${prefix}tax`)) {
      let args = message.content.split(" ");
      if (args[0] !== `${prefix}tax`) return
      if (!message.guild) return;
      if (message.author.bot) return;
      const embed1 = new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setDescription(`❌ __**Usage : **\`${prefix}tax [amount]\``);
      let number = message.content.split(' ').slice(1)[0];
      if (!number || isNaN(number)) {
        return message.reply({ embeds: [embed1] });
      }
      const tax = Math.floor((number * (20 / 19) + 1));
      const probottakes = (tax - number);
      const embed2 = new Discord.MessageEmbed()
        .setColor(`${embedscolor}`)
        .setDescription(`✔ __**The tax for**__ \`${number}\`\n**Is : **\`${tax}\`\n**Probot takes : **\`${probottakes}\``);
      message.reply({ embeds: [embed2] });
    }
  });


  client.on(`messageCreate`, message => {
    if (message.content.startsWith(`${prefix}set-tax`)) {
      let args = message.content.split(" ");
      if (args[0] !== `${prefix}set-tax`) return
      if (!message.guild) return;
      if (message.author.bot) return;
      const embed1 = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`❌ ** You dont have Premission - [ADMINISTRATOR]**`);
      const embed2 = new Discord.MessageEmbed()
        .setColor(`YELLOW`)
        .setDescription(`❗  __**Please mention/ID of channel!**__`);
      const embed3 = new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setDescription(`❌ __**The channel must be a Text Channel**__`);
      const embed4 = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setDescription(`❗ __**This is an auto tax Channel!**__`);
      const embed5 = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`❌ ** An error occurred while setting up the auto tax channel**`);

      if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply({ embeds: [embed1] });
      }

      let channel = message.content.split(' ').slice(1)[0]
      if (!channel) return message.reply({ embeds: [embed2] });
      channel = message.mentions.channels.first() || message.guild.channels.cache.get(channel)
      if (!channel || channel.type !== 'GUILD_TEXT') {
        return message.reply({ embeds: [embed3] });
      }

      const data = taxdb.get(`autotax_${message.guild.id}`) || []
      if (data.filter(c => c === channel.id).map(c => c).length > 0) {
        return message.reply({ embeds: [embed4] });
      }

      try {
        data.push(channel.id)
        taxdb.set(`autotax_${message.guild.id}`, data)
        message.reply(`Done ✅\nChannel: ${channel}`);
      } catch (err) {
        console.error(err);
        message.reply({ embeds: [embed5] });
      }
    }
  });

  client.on('messageCreate', async (message) => {
    if (message.content.startsWith(`${prefix}r-tax`)) {
      let args = message.content.split(" ");
      if (args[0] !== `${prefix}r-tax`) return
      if (!message.guild) return;
      try {
        const embed1 = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setDescription(`❌ ** You dont have Premission - [ADMINISTRATOR]**`);

        const embed2 = new Discord.MessageEmbed()
          .setColor(`YELLOW`)
          .setDescription(`❗  __**Please mention/ID of channel!**__`);

        const embed3 = new Discord.MessageEmbed()
          .setColor(`#ff0000`)
          .setDescription(`❌ __**The channel must be Text Channel**__`);

        const embed4 = new Discord.MessageEmbed()
          .setColor('YELLOW')
          .setDescription(`❗ __**This is not auto tax Channel!**__`);

        if (!message.member.permissions.has('ADMINISTRATOR')) {
          return message.reply({ embeds: [embed1] })
        }

        let channel = message.content.split(' ').slice(1)[0]
        if (!channel) return message.reply({ embeds: [embed2] });
        channel = message.mentions.channels.first() || message.guild.channels.cache.get(channel)
        if (!channel || channel.type !== 'GUILD_TEXT') return message.reply({ embeds: [embed3] });

        const data = taxdb.get(`autotax_${message.guild.id}`) || []
        if (!data.includes(channel.id)) return message.reply({ embeds: [embed4] });

        const index = data.indexOf(channel.id)
        data.splice(index, 1)

        taxdb.set(`autotax_${message.guild.id}`, data)

        message.reply(`Done ✅\nChannel: ${channel}`)
      } catch (err) {
        console.error(err)
        message.reply("Oops! Something went wrong.")
      }
    }
  })


  client.on("messageCreate", async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    const taxch = await taxdb.get(`autotax_${message.guild.id}`) || []
    if (taxch.includes(message.channel.id)) {
      let number = message.content.split(",");
      const tax = Math.floor((number * (20 / 19) + 1))
      const probottakes = (tax - number)
      if (isNaN(number)) return message.delete();
      const embed = new Discord.MessageEmbed()
        .setColor(`${embedscolor}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`✔ __**The tax for**__ \`${number}\`\n**Is : **\`${tax}\`\n**Probot takes : **\`${probottakes}\``)
      message.reply({ embeds: [embed] })
      message.delete()
        .catch(console.error)
    }
  });



  client.on(`messageCreate`, message => {
    if (message.content.startsWith(`${prefix}help`)) {
      if (message.author.bot) return;
      let args = message.content.split(" ");
      if (args[0] !== `${prefix}help`) return
      if (!message.guild) return;
      const helpEmbed = new Discord.MessageEmbed()
        .setColor(embedscolor)
        .setTitle(`***Auto-Tax commands***`)
        .addFields(
          {
            name: `${prefix}**tax [number]:**`
            , value: `__Return probot tax for the number__`, inline: false
          },

          {
            name: `${prefix}**set-tax [Room mention/ID]:**`
            , value: `__To set new auto-tax room__`, inline: false
          },

          {
            name: `${prefix}**r-tax [Room mention/ID]:**`
            , value: `__To remove setuped auto-tax room__`, inline: false
          },
        )
      message.reply({ embeds: [helpEmbed], allowedMentions: { repliedUser: false } })
    }
  })







  client.login(data.token).catch(() => {
    console.log(`Tax token ${data.BotID} not working`)
  })
})
