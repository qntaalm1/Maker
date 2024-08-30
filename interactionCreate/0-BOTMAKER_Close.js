const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents, Modal, TextInputComponent } = require("discord.js");
const Discord = require('discord.js');

const { Database } = require("st.db")
const client = require(`../index`)


client.on('interactionCreate', async (i) => {
  if (i.customId === `BOTMAKER_Close`) {
    const user = i.user.id;

    const Delembed = new Discord.MessageEmbed()
      .setColor(`#d5d5d5`)
      .setDescription(`__**The Ticket will be deleted in \`5\` seconds**__`);
      
    if (i.replied) {
      return;
    }
    
    i.reply({ embeds: [Delembed] }).then(timeembed => {
      const channel = i.channel;
      
      if (channel && channel.permissionsFor(channel.guild.me).has('MANAGE_CHANNELS')) {
        setTimeout(() => channel.delete(), 5000);
      } else {
        console.log('Unable to delete channel. Missing permissions or channel not available.');
      }
    }).catch(async (error) => { return console.log(error.message) })
  }
});
