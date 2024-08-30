const {
    Client,
    Collection,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,
    Intents,
    Modal,
    TextInputComponent
  } = require("discord.js");
  const { ChannelType } = require("discord-api-types/v9");
  const Discord = require('discord.js');
  const { SlashCommandBuilder } = require("@discordjs/builders")
  const { Database } = require("st.db")
  const db1 = new Database("/Json-db/Bots-Price.json")
  
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName(`free-bot`)
      .setDescription(`Make Bot for free`)
      .addStringOption(type => type
        .setName(`bot-type`)
        .setDescription(`Select the bot Type`)
        .addChoices(
          { name: `Auto-Tax`, value: `BuyAutoTax` },
          { name: `Test`, value: `BuyTest` },
        )
        .setRequired(true)
        ),
    botPermission: [""],
    authorPermission: [""],
    ownerOnly: true,
    async run(client, interaction) {
      await interaction.deferReply();
      try {
        if (!interaction.channel.name.startsWith(`ticket-`)) return interaction.editReply(`هذا الامر فقط يستخدم في رومات التكت لانه يحذف الروم`)
        const Bot_Type = interaction.options.getString(`bot-type`)
        console.log(Bot_Type)
        FreeBotButton = new MessageActionRow().addComponents(//تعديل
        new MessageButton()
          .setCustomId(`${Bot_Type}`)//تعديل
          .setLabel(`FreeBot`)
          .setStyle("PRIMARY")
      )
        interaction.editReply({components: [FreeBotButton]})
      } catch (error) {
        console.log(error)
        await interaction.editReply(`حدث خطا`)
      }
    },
  };