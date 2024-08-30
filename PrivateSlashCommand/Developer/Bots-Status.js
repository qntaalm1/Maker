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
  const db6 = new Database("bots-statusdb.json")
  
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName(`bots-status`)
      .setDescription(`Change sell status of bots off/on`)
      .addStringOption(type => type
        .setName(`bot-type`)
        .setDescription(`Select the bot Type`)
        .addChoices(
          { name: `Autoline`, value: `Autoline` },
          { name: `Suggestion`, value: `Suggestion` },
          { name: `Auto-Tax`, value: `Tax` },
          { name: `Bank`, value: `Bank` },
          { name: `Ticket`, value: `Ticket` },
          { name: `System`, value: `System` },
          { name: `Brodcast`, value: `Brodcast` },
          { name: `Scammer-Checker`, value: `Scammer` },
          { name: `Giveaway`, value: `Giveaway` },
          { name: `Probot-prime`, value: `Probot` },
        )
        .setRequired(true)
        )
  
      .addStringOption(p => p
        .setName(`bots-status`)
        .setDescription(`ON/OFF`)
        .addChoices(
            { name: `ON`, value: `1` },
            { name: `OFF`, value: `0` },
          )
        .setRequired(true)),
    botPermission: [""],
    authorPermission: [""],
    ownerOnly: true,
    async run(client, interaction) {
      await interaction.deferReply({ ephemeral: true });
      try {
        const botType = interaction.options.getString(`bot-type`)
        const status = interaction.options.getString(`bots-status`)

  
        db6.set(`${botType}`, status).then(async () => {
          const AutolineStatus = db6.get(`Autoline`) === "0" ? "🔴" : "🟢";
          const SuggestionStatus = db6.get(`Suggestion`) === "0" ? "🔴" : "🟢";
          const TaxStatus = db6.get(`Tax`) === "0" ? "🔴" : "🟢";
          const BankStatus = db6.get(`Bank`) === "0" ? "🔴" : "🟢";
          const TicketStatus = db6.get(`Ticket`) === "0" ? "🔴" : "🟢";
          const SystemStatus = db6.get(`System`) === "0" ? "🔴" : "🟢";
          const BrodcastStatus = db6.get(`Brodcast`) === "0" ? "🔴" : "🟢";
          const ScammerStatus = db6.get(`Scammer`) === "0" ? "🔴" : "🟢";
          const GiveawayStatus = db6.get(`Giveaway`) === "0" ? "🔴" : "🟢";
          const ProbotStatus = db6.get(`Probot`) === "0" ? "🔴" : "🟢";
          
          const embed = new Discord.MessageEmbed()
        .setColor(`#d5d5d5`)
        .setDescription(
        `Autoline : ${AutolineStatus}
        Suggestion : ${SuggestionStatus}
        Tax : ${TaxStatus}
        Bank : ${BankStatus}
        Ticket : ${TicketStatus}
        System : ${SystemStatus}
        Brodcast : ${BrodcastStatus}
        Scammer : ${ScammerStatus}
        Giveaway : ${GiveawayStatus}
        ProBot-Prime : ${ProbotStatus}`)
  
        interaction.editReply({embeds: [embed]})
        })
      } catch (error) {
        console.log(error)
        await interaction.editReply(`حدث خطا`)
      }
    },
  };