const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents, Modal, TextInputComponent } = require("discord.js");
const Discord = require('discord.js');

const { Database } = require("st.db")
const client = require(`../index`)
const BOTMKERDB = new Database("/Json-db/BOTMAKERDB.json")

//rebew modal
client.on(`interactionCreate`,async i =>{
    if (i.customId === `Renew-Whitelist`){
        if(i.user.id !== `807814162234867734`) return message.reply(`لا يمكنك استخدام هذا الزر`);
        const model = new Modal()
        .setCustomId(`RenewWhitelistBotMakerModal`)
        .setTitle("Renew whitelist BotMaker");
      const Bot_ID = new TextInputComponent()
        .setCustomId("Bot_ID")
        .setRequired(true)
        .setMaxLength(5)
        .setMinLength(1)
        .setLabel("The Bot ID")
        .setPlaceholder(`The ID`)
        .setStyle("SHORT");
      const Days = new TextInputComponent()
        .setCustomId("Bot_Days")
        .setRequired(true)
        .setMaxLength(3)
        .setMinLength(1)
        .setLabel(`Time by days`)
        .setPlaceholder(`The days`)
        .setStyle("SHORT");

      const The_ID = new MessageActionRow().addComponents(
        Bot_ID
      );
      const The_Days = new MessageActionRow().addComponents(
        Days
      );
      model.addComponents(The_ID, The_Days);
      await i.showModal(model);
    }
})

client.on("interactionCreate", async (interaction) => {
    if (
      interaction.isModalSubmit() &&
      interaction.customId === `RenewWhitelistBotMakerModal`
    ) {
      let ID = interaction.fields.getTextInputValue("Bot_ID");
      let Days = interaction.fields.getTextInputValue("Bot_Days");
      const day = (Days * 24 * 60 * 60)
  
      const DB = await  BOTMKERDB.get('TIMELEFTSUB');
        DB.forEach(botData => {
        if (botData.Whitelist === parseInt(ID)) {
          botData.Time += parseInt(day);
        }
      });
      BOTMKERDB.set('TIMELEFTSUB', DB);
      interaction.reply(`***تم اضافه ${Days} يوم***\n**WhiteListID :** ${ID}`).then(()=>{
        interaction.message.delete();
      })
    }
  });