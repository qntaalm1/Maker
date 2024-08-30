const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents, Modal, TextInputComponent } = require("discord.js");
const Discord = require('discord.js');
const client = require(`../index`)
const { Database } = require("st.db")
const BOTMAKETDB = new Database("/Json-db/BOTMAKERDB");
const BOTMKERSUBSDB = new Database("/Json-db/BotMakerSub.json")

const db = new Database("/Json-db/Create Bots DB.json");
const db2 = new Database("/Json-tokens/Tokens.json");
const db3 = new Database("/Json-db/Bots-Price.json");
const db4 = new Database("/Json-db/Number-of-tokens.json");
const db5 = new Database("/Json-db/OrderID.json");


const autolinedb = new Database("/Json-db/AutolineDB.json");
const taxdb = new Database("/Json-db/TaxDB.json");
const ms = require("ms");
const axios = require("axios");
const moment = require(`moment`);
const suggestiondb = new Database("/Json-db/SuggestionDB.json");
const bankdb = new Database("/Json-db/BankDB.json");
const validateURL = require("url-validation");
const ticketdb = new Database("/Json-db/TicketDB.json");
const ticketdb2 = new Database("/Json-db/TicketDB2.json");
const ticketdb3 = new Database("/Json-db/ticket-Number.json");
const systemdb = new Database("/Json-db/SystemDB.json");

const checkdb = new Database("/Json-db/BuyerChecker");

const { CoderServer ,selllogsch } = require('../config.json');


const embedscolor = "#000000";

const { Probot } = require("discord-probot-transfer");


//BuyAutoTAx
client.on(`interactionCreate`, async i => {
  if (i.customId === `Autotax_Continue`) {
    try {
      const TaxPrice = db3.get(`TaxP`) || 15000;
      const Taxtotalprice = Math.floor(TaxPrice * (20 / 19) + 1);
      const checkDB = checkdb.get(`${i.channel.id}`)
      if (checkDB) return i.reply({ content: `لا يمكنك الضغط علي الزر مره اخري قبل انتهاء الوقت`, ephemeral: true })
      checkdb.set(`${i.channel.id}`,`true`)
      await i.deferReply();
      const ownerID = BOTMAKETDB.get(`trID_${i.guild.id}`)//TheOwner
      const probotid = BOTMAKETDB.get(`probotID_${i.guild.id}`)//probotID
      if (!ownerID) return i.editReply(`**لا يمكنك الشراء بسبب عدم تحديد الاونر**`)
      if (!probotid) return i.editReply(`**لا يمكنك الشراء بسبب عدم تحديد ايدي برو بوت**`)
      client.probot = Probot(client, {
        fetchGuilds: true,
        data: [

            {
                fetchMembers: true,
                guildId: i.guild.id,
                probotId: probotid,
                owners: ownerID,
            },
        ],
    });
      await i.editReply(
        `__***.قم بكتابه امر التحويل التالي***__
              - **لديك 5 دقايق حتي تقوم بتحويل المبلغ**
              \`\`\`c ${ownerID} ${Taxtotalprice}\`\`\``//تعديل
      )
        
      
      var check = await client.probot.collect(i, {
        probotId: probotid,
        owners: ownerID,
        time: 1000 * 60 * 5,
        userId: i.user.id,
        price: Taxtotalprice,
        fullPrice: false,
      });
      if (check.status) {
        let Autotax_BUTTON = new MessageActionRow().addComponents(//تعديل
                new MessageButton()
                  .setCustomId(`BuyAutoTax`)//تعديل
                  .setLabel("Auto-tax")
                  .setStyle("PRIMARY")
              );
              i.channel.send({ components: [Autotax_BUTTON] }).then(()=>{
            checkdb.delete(`${i.channel.id}`);
         })
      } else if (check.error) {
        return i.channel.send(`> ${check.error.message} 😢`);
      } else {
        return i.channel.send(`**❌ اعد المحاوله.**`);
      }
    } catch (error) {
      console.log(error)
    }


  }
})


//AutoTax Modal
client.on("interactionCreate", async (i) => {
  if (i.customId === `BuyAutoTax`) {
    try {
      const model = new Modal()
        .setCustomId(`AutoTax_MODAL`)//تعديل
        .setTitle("Make Auto-tax bot");//تعديل
      const Bot_Token = new TextInputComponent()
        .setCustomId("Bot_Token")
        .setRequired(true)
        .setMaxLength(75)
        .setMinLength(70)
        .setLabel("token")
        .setPlaceholder(`The Token`)
        .setStyle("SHORT");
      const Bot_prefix = new TextInputComponent()
        .setCustomId("Bot_prefix")
        .setRequired(true)
        .setMaxLength(3)
        .setMinLength(1)
        .setLabel(`bot prefix`)
        .setPlaceholder(`The Prefix`)
        .setStyle("SHORT");
      const The_Token = new MessageActionRow().addComponents(
        Bot_Token
      );
      const The_Prefix = new MessageActionRow().addComponents(
        Bot_prefix
      );
      model.addComponents(The_Token, The_Prefix);
      await i.showModal(model);
    } catch (error) {
      console.log(error)
    }

  }
});

//AutoTax Modal Submit
client.on("interactionCreate", async (interaction) => {
  if (
    interaction.isModalSubmit() &&
    interaction.customId === `AutoTax_MODAL`
  ) {
    try {
      const TaxID = db4.get(`Tax_ID`) || 1;
      let token = interaction.fields.getTextInputValue("Bot_Token");
      let prefix = interaction.fields.getTextInputValue("Bot_prefix");
      let owner = interaction.user.id;

      const client4 = new Client({ intents: 32767 });
      client4.login(token)
        .then(async () => {
          db4.set(`Tax_ID`, TaxID + 1);
          client4.on("ready", () => {
            const statuses = [
              `My prefix ${prefix}`,
              `Auto-Tax bot`,
            ];
            const timers = 1;
            const timeing = Math.floor(timers * 1000);
            setInterval(function () {
              const lengthesof = statuses.length;
              const status = Math.floor(Math.random() * lengthesof);
              client4.user.setStatus("idle");
              client4.user.setActivity(statuses[status], {
                type: `WATCHING`,
              });
            }, timeing);
          });
          await interaction.reply({
            content: `Done added your token to Auto-tax Tokens\n**Your bot Token:** \`${token}\`\n**Your bot Prefix:** \`${prefix}\`\n**Your Bot ID:** \`${TaxID}\`\n**Type:** \`Auto-tax\``,
            ephemeral: true,
          });
          const client_role = BOTMAKETDB.get(`ClientRole_${interaction.guild.id}`)
          const channel = BOTMAKETDB.get(`SellsLog_${interaction.guild.id}`)
          const logchannel = await client.channels.cache.get(channel);

          const buyer = interaction.user;
          const buyerembed = new Discord.MessageEmbed()
            .setColor(`#d5d5d5`)
            .setTitle(`__***Auto-tax bot purchase***___`)
            .setDescription(
              `**Hello <@${interaction.user.id}> you have bought a Auto-tax bot.**\n__and your Bot informantion are here__\n**Your bot Token.** **:**\`${token}\`\n**Your bot Prefix.** **:** \`${prefix}\`\n**Your bot ID.** **:**\`${TaxID}\``
            );
          buyer
            .send({ embeds: [buyerembed] })
            .catch(async (error) => {
              return console.log(error.message);
            });

            const Delembed = new Discord.MessageEmbed()
              .setColor(interaction.guild.me.displayHexColor)
              .setDescription(
                `__**The Ticket will be deleted in \`10\` seconds**__`
              );
              interaction.channel.send({ embeds: [Delembed] })
              .then((timeembed) => {
                setTimeout(() => interaction.channel.delete(), 10000);
              })
              .catch(async (error) => {
                return console.log(error.message);
              });
              interaction.message.delete();
          if (client_role) {
            try {
              const role = interaction.guild.roles.cache.find(
                (r) => r.id === client_role
              );
              await interaction.member.roles.add(role)
            } catch (error) {
              console.log(`I cant find client role in TAX`)//تعديل
            }
          }

          try {
            const MainServer =   client.guilds.cache.get(CoderServer);
            const MainServerLogChannel =  MainServer.channels.cache.get(selllogsch);
            if (MainServerLogChannel) {
              MainServerLogChannel.send(`Auto-tax bot has been purchased by **${buyer.username}**\nServerName:${interaction.guild.name}\nID:${interaction.guild.id}\nOwner:<@!${interaction.guild.ownerId}>`);
              }
          } catch (error) {
            console.log(error.message)
          }

          if (logchannel && logchannel.type === 'GUILD_TEXT') {
            try {
              logchannel.send(
                `Auto-tax bot has been purchased by **${buyer.username}**`
              );
            } catch (error) {
              console.log(`I cant find sells log channel in TAX`)//تعديل
            }
          }
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
          client4.on("messageCreate", async (message) => {
            if (message.content.startsWith(`${prefix}tax`)) {
              let args = message.content.split(" ");
              if (args[0] !== `${prefix}tax`) return;
              if (message.author.bot) return;
              if (!message.guild) return;
              const embed1 = new Discord.MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription(
                  `❌ __**Usage : **\`${prefix}tax [amount]\``
                );
              let number = message.content.split(" ").slice(1)[0];
              if (!number || isNaN(number)) {
                return message.reply({ embeds: [embed1] });
              }
              const tax = Math.floor(number * (20 / 19) + 1);
              const probottakes = tax - number;
              const embed2 = new Discord.MessageEmbed()
                .setColor(`${embedscolor}`)
                .setDescription(
                  `✔ __**The tax for**__ \`${number}\`\n**Is : **\`${tax}\`\n**Probot takes : **\`${probottakes}\``
                );
              message.reply({ embeds: [embed2] });
            }
          });

          client4.on(`messageCreate`, (message) => {
            if (message.content.startsWith(`${prefix}set-tax`)) {
              let args = message.content.split(" ");
              if (args[0] !== `${prefix}set-tax`) return;
              if (message.author.bot) return;
              if (!message.guild) return;
              const embed1 = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(
                  `❌ ** You dont have Premission - [ADMINISTRATOR]**`
                );
              const embed2 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setDescription(
                  `❗  __**Please mention/ID of channel!**__`
                );
              const embed3 = new Discord.MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription(
                  `❌ __**The channel must be a Text Channel**__`
                );
              const embed4 = new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setDescription(
                  `❗ __**This is an auto tax Channel!**__`
                );
              const embed5 = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(
                  `❌ ** An error occurred while setting up the auto tax channel**`
                );

              if (
                !message.member.permissions.has("ADMINISTRATOR")
              ) {
                return message.reply({ embeds: [embed1] });
              }

              let channel = message.content.split(" ").slice(1)[0];
              if (!channel)
                return message.reply({ embeds: [embed2] });
              channel =
                message.mentions.channels.first() ||
                message.guild.channels.cache.get(channel);
              if (!channel || channel.type !== "GUILD_TEXT") {
                return message.reply({ embeds: [embed3] });
              }

              const data =
                taxdb.get(`autotax_${message.guild.id}`) || [];
              if (
                data.filter((c) => c === channel.id).map((c) => c)
                  .length > 0
              ) {
                return message.reply({ embeds: [embed4] });
              }

              try {
                data.push(channel.id);
                taxdb.set(`autotax_${message.guild.id}`, data);
                message.reply(`Done ✅\nChannel: ${channel}`);
              } catch (err) {
                console.error(err);
                message.reply({ embeds: [embed5] });
              }
            }
          });

          client4.on("messageCreate", async (message) => {
            if (message.content.startsWith(`${prefix}r-tax`)) {
              let args = message.content.split(" ");
              if (args[0] !== `${prefix}r-tax`) return;
              if (!message.guild) return;
              try {
                const embed1 = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setDescription(
                    `❌ ** You dont have Premission - [ADMINISTRATOR]**`
                  );

                const embed2 = new Discord.MessageEmbed()
                  .setColor(`YELLOW`)
                  .setDescription(
                    `❗  __**Please mention/ID of channel!**__`
                  );

                const embed3 = new Discord.MessageEmbed()
                  .setColor(`#ff0000`)
                  .setDescription(
                    `❌ __**The channel must be Text Channel**__`
                  );

                const embed4 = new Discord.MessageEmbed()
                  .setColor("YELLOW")
                  .setDescription(
                    `❗ __**This is not auto tax Channel!**__`
                  );

                if (
                  !message.member.permissions.has("ADMINISTRATOR")
                ) {
                  return message.reply({ embeds: [embed1] });
                }

                let channel = message.content
                  .split(" ")
                  .slice(1)[0];
                if (!channel)
                  return message.reply({ embeds: [embed2] });
                channel =
                  message.mentions.channels.first() ||
                  message.guild.channels.cache.get(channel);
                if (!channel || channel.type !== "GUILD_TEXT")
                  return message.reply({ embeds: [embed3] });

                const data =
                  taxdb.get(`autotax_${message.guild.id}`) || [];
                if (!data.includes(channel.id))
                  return message.reply({ embeds: [embed4] });

                const index = data.indexOf(channel.id);
                data.splice(index, 1);

                taxdb.set(`autotax_${message.guild.id}`, data);

                message.reply(`Done ✅\nChannel: ${channel}`);
              } catch (err) {
                console.error(err);
                message.reply("Oops! Something went wrong.");
              }
            }
          });

          client4.on("messageCreate", async function (message) {
            if (message.author.bot) return;
            if (!message.guild) return;
            const taxch =
              (await taxdb.get(`autotax_${message.guild.id}`)) ||
              [];
            if (taxch.includes(message.channel.id)) {
              let number = message.content.split(",");
              const tax = Math.floor(number * (20 / 19) + 1);
              const probottakes = tax - number;
              if (isNaN(number)) return;
              const embed = new Discord.MessageEmbed()
                .setColor(`${embedscolor}`)
                .setThumbnail(
                  message.guild.iconURL({ dynamic: true })
                )
                .setDescription(
                  `✔ __**The tax for**__ \`${number}\`\n**Is : **\`${tax}\`\n**Probot takes : **\`${probottakes}\``
                );
              message.reply({ embeds: [embed] });
              message.delete().catch(console.error);
            }
          });

          client4.on(`messageCreate`, (message) => {
            if (message.content.startsWith(`${prefix}help`)) {
              if (message.author.bot) return;
              let args = message.content.split(" ");
              if (args[0] !== `${prefix}help`) return;
              if (!message.guild) return;
              const helpEmbed = new Discord.MessageEmbed()
                .setColor(embedscolor)
                .setTitle(`***Auto-Tax commands***`)
                .addFields(
                  {
                    name: `${prefix}**tax [number]:**`,
                    value: `__Return probot tax for the number__`,
                    inline: false,
                  },

                  {
                    name: `${prefix}**set-tax [Room mention/ID]:**`,
                    value: `__To set new auto-tax room__`,
                    inline: false,
                  },

                  {
                    name: `${prefix}**r-tax [Room mention/ID]:**`,
                    value: `__To remove setuped auto-tax room__`,
                    inline: false,
                  }
                );

              message.reply({
                embeds: [helpEmbed],
                allowedMentions: { repliedUser: false },
              });
            }
          });

          db2.push(`tax`, {
            token: token,
            prefix: prefix,
            owner: owner,
            BotID: `${TaxID}`,
          });
        })
        .catch(() => {
          return interaction.reply('قم بتفعيل الثلاث خيارات في البوت الخاص بك وأعد المحاولة.');
        })
    } catch (error) {
      console.log(error)
    }
  }
});