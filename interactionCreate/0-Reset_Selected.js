const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents, Modal, TextInputComponent } = require("discord.js");
const Discord = require('discord.js');

const { Database } = require("st.db")
const client = require(`../index`)


client.on('interactionCreate', async (i) => {
  if (!i.isSelectMenu()) return;
  if (i.customId === 'BOTMAKER_Selector') {
    const Selected = i.values[0];

    if (Selected === 'Reset_Selected') {
      if (i.replied) {
        return;
      } else {
        try {
          if (!i.replied) {
            await i.update()
          }
        } catch (error) {
          return console.log(`Rested the menu`)
        }
      }
    }
  }
});
