const Discord = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders")
const { ChannelType } = require("discord-api-types/v9");
const { Database } = require("st.db")
const BOTMAKERDB = new Database("/Json-db/BOTMAKERDB");
const ticketDB = new  Database("/Ticket-DB/TicketDB.json")

module.exports = {
   data : new SlashCommandBuilder()
  .setName(`setup-ticketsystem`)
  .setDescription(`setup the ticket system`)
  .addChannelOption(ch =>ch.setName(`ticket-channel`).setDescription(`قم باختيار روم التكت`).addChannelTypes(ChannelType.GuildText) .setRequired(true))
  .addChannelOption(ca =>ca.setName(`button-1-category`).setDescription(`قم باختيار كاتجوري للزرالاول`).addChannelTypes(ChannelType.GuildCategory).setRequired(true))
  .addChannelOption(ca =>ca .setName(`button-2-category`).setDescription(`قم باختيار كاتجوري الثاني`) .addChannelTypes(ChannelType.GuildCategory) .setRequired(true))
  .addStringOption(text => text.setName(`ticket-msg`).setDescription(`قم بكتابه رساله التكت`).setRequired(true))
  .addStringOption(text =>text.setName(`ticket-welcome-1`).setDescription(`قم بكتابه رساله الترحيب للزر الاول`).setRequired(true))
  .addStringOption(text =>text.setName(`ticket-welcome-2`).setDescription(`قم بكتابه رساله الترحيب للزر الثاني`).setRequired(true))
  .addStringOption(text =>text.setName(`button-1-name`).setDescription(`قم باختيار اسم الزر الاول`).setMaxLength(10).setRequired(true))
  .addStringOption(text =>text.setName(`button-2-name`).setDescription(`قم باختيار اسم الزر الثاني`).setMaxLength(10).setRequired(true))
  .addRoleOption(r=>r.setName(`support-1-role`).setDescription(`قم باختيار رتبه الدعم الفني للزر الاول`).setRequired(true))
  .addRoleOption(r=>r.setName(`support-2-role`).setDescription(`قم باختيار رتبه الدعم الفني للزر الثاني`).setRequired(true))
  .addStringOption(text => text.setName(`button-1-status`).setDescription(`قم باختيار ان كنت ترغب بان الزر الاول ان يكون مغلق ام لا`).setChoices({ name: 'مفتوح', value: 'false' },{ name: 'مغلق', value: 'true' }).setRequired(true))
  .addStringOption(text => text.setName(`button-2-status`).setDescription(`قم باختيار ان كنت ترغب بان الزر الثاني ان يكون مغلق ام لا`).setChoices({ name: 'مفتوح', value: 'false' },{ name: 'مغلق', value: 'true' }).setRequired(true))
  .addStringOption(text => text.setName(`button-1-color`).setDescription(`قم باختيار لون الزر الاول`).setChoices({ name: 'اخضر', value: 'SUCCESS' },{ name: 'احمر', value: 'DANGER' },{ name: 'رمادي', value: 'SECONDARY' },{ name: 'ازرق', value: 'PRIMARY' }).setRequired(true))
  .addStringOption(text => text.setName(`button-2-color`).setDescription(`قم باختيار لون الزر الثاني`).setChoices({ name: 'اخضر', value: 'SUCCESS' },{ name: 'احمر', value: 'DANGER' },{ name: 'رمادي', value: 'SECONDARY' },{ name: 'ازرق', value: 'PRIMARY' }).setRequired(true))
  .addStringOption(text =>text.setName(`button-1-emoji`).setDescription(`قم بوضع ايدي ايموجي للزر الاول`).setRequired(false))
  .addStringOption(text =>text.setName(`button-2-emoji`).setDescription(`قم بوضع ايدي ايموجي للزر الثاني`).setRequired(false))
  .addRoleOption(r=>r.setName(`mention-1-role`).setDescription(`قم باختيار رتبه التي تريد منشنتها عند قتح تكت للزر الاول`).setRequired(false))
  .addRoleOption(r=>r.setName(`mention-2-role`).setDescription(`قم باختيار رتبه التي تريد منشنتها عند قتح تكت للزر الثاني`).setRequired(false)),


    botPermission: [""], 
    authorPermission: ["ADMINISTRATOR"], 
    ownerOnly: false,
  async run(client, interaction) {
    await interaction.deferReply({ephemeral: true});

    const ticketchannel =interaction.options.get(`ticket-channel`).value;
    const category1 =interaction.options.get(`button-1-category`).value;
    const category2 =interaction.options.get(`button-2-category`).value;
    const ticketmsg =interaction.options.get(`ticket-msg`).value;
    const welcome1 =interaction.options.get(`ticket-welcome-1`).value;
    const welcome2 =interaction.options.get(`ticket-welcome-2`).value;
    const buttonname1 =interaction.options.get(`button-1-name`).value;
    const buttonname2 =interaction.options.get(`button-2-name`).value;
    const support1 =interaction.options.get(`support-1-role`).value;
    const support2 =interaction.options.get(`support-2-role`).value;
    const buttonstatus1 =interaction.options.get(`button-1-status`).value;
    const buttonstatus2 =interaction.options.get(`button-2-status`).value;
    const buttoncolor1 =interaction.options.get(`button-1-color`).value;
    const buttoncolor2 =interaction.options.get(`button-2-color`).value;
    const emoji1Option1 =interaction.options.get('button-1-emoji');
    const emoji1 = emoji1Option1 ? emoji1Option1.value : '';      
    const emoji1Option2 =interaction.options.get('button-2-emoji');
    const emoji2 = emoji1Option2 ? emoji1Option2.value : '';  
    const mention1Option =interaction.options.get('mention-1-role');
    const mention1 = mention1Option ? mention1Option.value : '';
    const mention1Option2 =interaction.options.get('mention-2-role');
    const mention2 = mention1Option2 ? mention1Option2.value : '';


    try {
        ticketDB.set(`TicketSystem_${interaction.guild.id}`, {
          channel: ticketchannel,
          category1: category1,
          category2: category2,
          message: ticketmsg,
          welcome1: welcome1,
          welcome2: welcome2,
          buttonname1: buttonname1,
          buttonname2: buttonname2,
          support1: support1,
          support2: support2,
          buttonstatus1: buttonstatus1,
          buttonstatus2: buttonstatus2,
          color1:buttoncolor1,
          color2:buttoncolor2,
          emoji1: emoji1,
          emoji2: emoji2,
          mention1: mention1,
          mention2: mention2,
        }).then(async()=>{
          await interaction.editReply(`Setuped Ticket System Successfully`);
        })
      } catch (error) {
        await interaction.editReply(`حدث خطا`)
      }
    // await interaction.reply({ });
  },
};