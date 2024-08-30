const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents, Modal, TextInputComponent } = require("discord.js");
const Discord = require('discord.js');

const { Database } = require("st.db")
const client = require(`../index`)
const ticketdb3 = new Database("/Json-db/ticket-Number.json");
const BOTMAKETDB = new Database("/Json-db/BOTMAKERDB");
const db6 = new Database("bots-statusdb.json");
const db = new Database("/Json-db/Create Bots DB.json");
const db2 = new Database("/Json-tokens/Tokens.json");
const db3 = new Database("/Json-db/Bots-Price.json");
const db4 = new Database("/Json-db/Number-of-tokens.json");
const db5 = new Database("/Json-db/OrderID.json");
const autolinedb = new Database("/Json-db/AutolineDB.json");





const Type = `Auto-tax`

client.on(`interactionCreate`, async (i) => {
    if(!i.isSelectMenu())return;
  if (i.customId === `BOTMAKER_Selector`) {
    const Selected = i.values[0];

    if(Selected === `Tax_Selected`){//تعديل
      try {
        const taxstatus = db6.get(`Tax`) || "1";
        await i.deferReply({ ephemeral: true });
        if (taxstatus === "0") {//تعديل
          return await i.editReply(`***لا تستطيع شراء هذا البوت في الوقت الحالي***
            **تستطيع ان تحاول مره ثانيه عندما يكون متوفر**`);
        }
        if(!i.guild.me.permissions.has('ADMINISTRATOR')) return i.editReply({
          content: `I dont have permissions`,
          ephemeral: true,
          })
      const user = i.user.id
      const ticketnumber =
      ticketdb3.get(`BOTMAKERORDERNUMBER_${i.guild.id}`) || 1;
      const data = BOTMAKETDB.get(`BotMakerTicket_${i.guild.id}`);
      
      const ticketcategory = data.Category;
      const category = i.guild.channels.cache.find(
      (c) => c.id === `${ticketcategory}` && c.type === "GUILD_CATEGORY"
      );
      
      const welcomeMSG = new Discord.MessageEmbed()
      .setColor(i.guild.me.displayHexColor)
      .setDescription(
      `**لاستكمال عمليه الشراء قم بضغط علي زر**\n**"Continue"**\n**BotType :** __${Type}__`
      );
      
      const OrderButtons = new MessageActionRow().addComponents([
      new MessageButton()
      .setCustomId(`BOTMAKER_Close`) //تعديل
      .setStyle(`DANGER`)
      .setLabel(`Close`)
      .setDisabled(false),
      new MessageButton()
      .setCustomId(`Autotax_Continue`) //تعديل
      .setStyle(`SUCCESS`)
      .setLabel("Continue")
      .setDisabled(false),
      ]);
      
      const channel = await i.guild.channels.create(`ticket-${ticketnumber}`, {
      type: "text",
      parent: category,
      permissionOverwrites: [
      {
      id: i.guild.roles.everyone.id,
      deny: ["VIEW_CHANNEL"],
      },
      {
      id: `${user}`,
      allow: ["VIEW_CHANNEL"],
      },
      ],
      topic: `${user}`,
      });
      ticketdb3.set(
      `BOTMAKERORDERNUMBER_${i.guild.id}`,
      parseInt(ticketnumber + 1)
      );
      
      channel.send({
      content: `<@${i.user.id}>`,
      embeds: [welcomeMSG],
      components: [OrderButtons],
      });
      await i
      .editReply({
      content: `Your ticket has been created: ${channel}`,
      ephemeral: true,
      })
      .catch((err) => console.log(err));
      } catch (error) {
        console.log(error)
      }
    }
  }
});