const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents, Modal, TextInputComponent } = require("discord.js");
const Discord = require('discord.js');

const client = require(`../index`)
const { Database } = require("st.db")
const ticketDB = new Database("/Ticket-DB/TicketDB.json")
const ticketnumber = new Database("/Ticket-DB/ticket-Number.json")
const ticketDB2 = new Database("/Ticket-DB/TicketDB2.json")


//button 1 pressed
client.on(`interactionCreate`, async i => {
  try {
    if (i.customId === `Button1_${i.guild.id}`) {
      i.deferReply({ ephemeral: true });
      const data = ticketDB.get(`TicketSystem_${i.guild.id}`)
      const ticketcategory1 = data.category1
      const category1 = i.guild.channels.cache.find(c => c.id === `${ticketcategory1}` && c.type === 'GUILD_CATEGORY');//تعديل
  
      const mention1 = data.mention1
      const welcome1 = data.welcome1
      const supportteam1 = data.support1
  
      const ticketnumber1 = ticketnumber.get(`NumberButton1_${i.guild.id}`) || 1;//تعديل
      const user = i.user.id
      const channel = await i.guild.channels.create(`ticket-${ticketnumber1}`, {
        type: 'text',
        parent: category1, // ID of the category where tickets should be created
        permissionOverwrites: [
          {
            id: i.guild.roles.everyone.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: `${user}`,
            allow: ['VIEW_CHANNEL'],
          },
          {
            id: `${supportteam1}`,
            allow: ['VIEW_CHANNEL'],
          },
        ],
        topic: `${user}`,
      });
  
      const Ticketbuttons = new MessageActionRow()
        .addComponents([
          new MessageButton()
            .setCustomId(`Close_Button`)
            .setStyle(`DANGER`)
            .setLabel("Close")
            .setDisabled(false),
          new MessageButton()
            .setCustomId(`Claim_Button`)//تعديل
            .setStyle(`SUCCESS`)
            .setLabel("Claim")
            .setDisabled(false),
          new MessageButton()
            .setCustomId(`TransScript_${supportteam1}`)//تعديل
            .setStyle(`SECONDARY`)
            .setLabel("TransScript")
            .setDisabled(true)
        ]);
  
      const welcomeEmbed = new Discord.MessageEmbed()
        .setColor(i.guild.me.displayHexColor)
        .setDescription(`${welcome1}`)//تعديل
      ticketnumber.set(`NumberButton1_${i.guild.id}`, parseInt(ticketnumber1 + 1))//تعديل
  
      if (!mention1) {
        channel.send(`<@${user}>`)
      } else {
        channel.send(`<@${user}>,<@&${mention1}>`)
      }
      channel.send({ embeds: [welcomeEmbed], components: [Ticketbuttons] })
      i.editReply(`Your ticket has been created: ${channel}`)
    }
  } catch (error) {
    console.log(error.message)
  }
})

//button 2 pressed
client.on(`interactionCreate`, async i => {
  try {
    if (i.customId === `Button2_${i.guild.id}`) {
      i.deferReply({ ephemeral: true });
      const data = ticketDB.get(`TicketSystem_${i.guild.id}`)
      const ticketcategory2 = data.category2
      const category2 = i.guild.channels.cache.find(c => c.id === `${ticketcategory2}` && c.type === 'GUILD_CATEGORY');//تعديل
  
      const mention2 = data.mention2
      const welcome2 = data.welcome2
      const supportteam2 = data.support2
  
      const ticketnumber2 = ticketnumber.get(`NumberButton2_${i.guild.id}`) || 1;//تعديل
      const user = i.user.id
      const channel = await i.guild.channels.create(`ticket-${ticketnumber2}`, {
        type: 'text',
        parent: category2, // ID of the category where tickets should be created
        permissionOverwrites: [
          {
            id: i.guild.roles.everyone.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: `${user}`,
            allow: ['VIEW_CHANNEL'],
          },
          {
            id: `${supportteam2}`,
            allow: ['VIEW_CHANNEL'],
          },
        ],
        topic: `${user}`,
      });
  
      const Ticketbuttons = new MessageActionRow()
        .addComponents([
          new MessageButton()
            .setCustomId(`Close_Button`)
            .setStyle(`DANGER`)
            .setLabel("Close")
            .setDisabled(false),
          new MessageButton()
            .setCustomId(`Claim_Button`)//تعديل
            .setStyle(`SUCCESS`)
            .setLabel("Claim")
            .setDisabled(false),
          new MessageButton()
            .setCustomId(`TransScript_${supportteam2}`)//تعديل
            .setStyle(`SECONDARY`)
            .setLabel("TransScript")
            .setDisabled(true)
        ]);
  
      const welcomeEmbed = new Discord.MessageEmbed()
        .setColor(i.guild.me.displayHexColor)
        .setDescription(`${welcome2}`)//تعديل
      ticketnumber.set(`NumberButton2_${i.guild.id}`, parseInt(ticketnumber2 + 1))//تعديل
  
      if (!mention2) {
        channel.send(`<@${user}>`)
      } else {
        channel.send(`<@${user}>,<@&${mention2}>`)
      }
      channel.send({ embeds: [welcomeEmbed], components: [Ticketbuttons] })
      i.editReply(`Your ticket has been created: ${channel}`)
    }
  } catch (error) {
    console.log(error.message)
  }

})


//close button
client.on('interactionCreate', async (i) => {
  try {
    if (i.customId === `Close_Button`) {
      const Delembed = new Discord.MessageEmbed()
        .setColor(i.guild.me.displayHexColor)
        .setDescription(`__**The Ticket will be deleted in \`5\` seconds**__`);
      if (i.replied) {
        return;
      }
      i.reply({ embeds: [Delembed] }).then(timeembed => {
        setTimeout(() => i.channel.delete(), 5000);
      }).catch(async (error) => { return console.log(error.message) })
    }
  } catch (error) {
    console.log(error.message)
  }

})


//claim button
client.on('interactionCreate', async (i) => {
  try {
    const data = ticketDB.get(`TicketSystem_${i.guild.id}`)
    if(!data)return
    const supportteam1 = data.support1
    const ticketcategory1 = data.category1
    const category1 = i.guild.channels.cache.find(c => c.id === `${ticketcategory1}` && c.type === 'GUILD_CATEGORY');
    const supportteam2 = data.support2
  
  
    const ticketcategory2 = data.category2
    const category2 = i.guild.channels.cache.find(c => c.id === `${ticketcategory2}` && c.type === 'GUILD_CATEGORY');//تعديل
    if (i.customId === `Claim_Button`) {
      const user = i.user.id;
      const member = i.guild.members.cache.get(user);
      if (i.channel.parent === category1) {
        if (!member.roles.cache.has(supportteam1)) {
          return i.reply({ content: 'لا يمكنك استخدام هذا الزر.', ephemeral: true });
        }
        const role = i.guild.roles.cache.get(supportteam1);
        i.channel.permissionOverwrites.edit(member, {
          SEND_MESSAGES: true
        })
        i.channel.permissionOverwrites.edit(role, {
          SEND_MESSAGES: false
        }).then(() => {
          const claimedButton = new MessageButton()
            .setCustomId(`Claimed_Button`)
            .setStyle(`SECONDARY`)
            .setLabel("Claimed")
            .setDisabled(false);
          const Ticketbuttons = new MessageActionRow()
            .addComponents([
              new MessageButton()
                .setCustomId(`Close_Button`)
                .setStyle(`DANGER`)
                .setLabel("Close")
                .setDisabled(false),
              claimedButton,
              new MessageButton()
                .setCustomId(`TransScript_${supportteam1}`)//تعديل
                .setStyle(`SECONDARY`)
                .setLabel("TransScript")
                .setDisabled(true)
            ]);
  
          const claimEmbed = new Discord.MessageEmbed()
            .setColor(`WHITE`)
            .setDescription(`***تم استلام التذكره***\n**بواسطه : <@${i.user.id}>**`)
          ticketDB2.set(`climedBy_${client.user.id}_${i.channel.id}`, i.user.id)
          i.update({ components: [Ticketbuttons] }).then(async doneclaimed => {
            const ticketchannel1 = i.channel.id; // تحديد معرف القناة باستخدام i.channel.id
            const claimedchannel = client.channels.cache.get(ticketchannel1);
            claimedchannel.send({ embeds: [claimEmbed] })
          })
        })
      }
  
      else if (i.channel.parent === category2) {
        if (!member.roles.cache.has(supportteam2)) {
          return i.reply({ content: 'لا يمكنك استخدام هذا الزر.', ephemeral: true });
        }
        const role = i.guild.roles.cache.get(supportteam2);
        i.channel.permissionOverwrites.edit(member, {
          SEND_MESSAGES: true
        })
        i.channel.permissionOverwrites.edit(role, {
          SEND_MESSAGES: false
        }).then(() => {
          const claimedButton = new MessageButton()
            .setCustomId(`Claimed_Button`)
            .setStyle(`SECONDARY`)
            .setLabel("Claimed")
            .setDisabled(false);
          const Ticketbuttons = new MessageActionRow()
            .addComponents([
              new MessageButton()
                .setCustomId(`Close_Button`)
                .setStyle(`DANGER`)
                .setLabel("Close")
                .setDisabled(false),
              claimedButton,
              new MessageButton()
                .setCustomId(`TransScript_${supportteam2}`)//تعديل
                .setStyle(`SECONDARY`)
                .setLabel("TransScript")
                .setDisabled(true)
            ]);
  
          const claimEmbed = new Discord.MessageEmbed()
            .setColor(`WHITE`)
            .setDescription(`***تم استلام التذكره***\n**بواسطه : <@${i.user.id}>**`)
          ticketDB2.set(`climedBy_${client.user.id}_${i.channel.id}`, i.user.id)
          i.update({ components: [Ticketbuttons] }).then(async doneclaimed => {
            const ticketchannel1 = i.channel.id;
            const claimedchannel = client.channels.cache.get(ticketchannel1);
            claimedchannel.send({ embeds: [claimEmbed] })
          })
        })
      }
    }
  } catch (error) {
    console.log(error.message)
  }

})


//unclaim button
client.on('interactionCreate', async (i) => {
  try {
    const data = ticketDB.get(`TicketSystem_${i.guild.id}`)
    if(!data)return
    const supportteam1 = data.support1
    const ticketcategory1 = data.category1
    const category1 = i.guild.channels.cache.find(c => c.id === `${ticketcategory1}` && c.type === 'GUILD_CATEGORY');
    const supportteam2 = data.support2
  
    const climer = ticketDB2.get(`climedBy_${client.user.id}_${i.channel.id}`);
    const member = i.guild.members.cache.get(i.user.id);
    const hasPermission = member.permissions.has('ADMINISTRATOR');
  
    const ticketcategory2 = data.category2
    const category2 = i.guild.channels.cache.find(c => c.id === `${ticketcategory2}` && c.type === 'GUILD_CATEGORY');//تعديل
    if (i.customId === `Claimed_Button`) {
      const user = i.user.id;
      const member = i.guild.members.cache.get(user);
      if (i.channel.parent === category1) {
        if (i.user.id !== climer && !hasPermission) {
          return i.reply({ content: `**لقد تم استلام التذكره بواسطه : <@${climer}>**`, ephemeral: true }).catch(err => console.log(err));
        }
        const role = i.guild.roles.cache.get(supportteam1);
        i.channel.permissionOverwrites.edit(member, {
          SEND_MESSAGES: false
        })
        i.channel.permissionOverwrites.edit(role, {
          SEND_MESSAGES: true
        }).then(() => {
          const claimButton = new MessageButton()
            .setCustomId(`Claim_Button`)
            .setStyle(`SUCCESS`)
            .setLabel("Claim")
            .setDisabled(false);
          const Ticketbuttons = new MessageActionRow()
            .addComponents([
              new MessageButton()
                .setCustomId(`Close_Button`)
                .setStyle(`DANGER`)
                .setLabel("Close")
                .setDisabled(false),
              claimButton,
              new MessageButton()
                .setCustomId(`TransScript_${supportteam1}`)//تعديل
                .setStyle(`SECONDARY`)
                .setLabel("TransScript")
                .setDisabled(true)
            ]);
  
          const notclimed = new Discord.MessageEmbed()
            .setColor(`WHITE`)
            .setDescription(`***تم الغاء استلام التذكره***\n**بواسطه : <@${i.user.id}>**`)
  
          ticketDB2.delete(`climedBy_${client.user.id}_${i.channel.id}`)
  
          const defaultPermissions = i.channel.permissionOverwrites.cache.find(overwrite => overwrite.id === member.id);
          const climerPermissions = i.channel.permissionOverwrites.cache.find(overwrite => overwrite.id === climer);
          defaultPermissions ? defaultPermissions.delete() : null;
          climerPermissions ? climerPermissions.delete() : null;
          i.update({ components: [Ticketbuttons] }).then(async doneclaimed => {
            const ticketchannel1 = i.channel.id;
            const claimedchannel = client.channels.cache.get(ticketchannel1);
            claimedchannel.send({ embeds: [notclimed] })
          })
        })
      }
  
      else if (i.channel.parent === category2) {
        if (i.user.id !== climer && !hasPermission) {
          return i.reply({ content: `**لقد تم استلام التذكره بواسطه : <@${climer}>**`, ephemeral: true }).catch(err => console.log(err));
        }
        const role = i.guild.roles.cache.get(supportteam2);
        i.channel.permissionOverwrites.edit(member, {
          SEND_MESSAGES: false
        })
        i.channel.permissionOverwrites.edit(role, {
          SEND_MESSAGES: true
        }).then(() => {
          const claimButton = new MessageButton()
            .setCustomId(`Claim_Button`)
            .setStyle(`SUCCESS`)
            .setLabel("Claim")
            .setDisabled(false);
          const Ticketbuttons = new MessageActionRow()
            .addComponents([
              new MessageButton()
                .setCustomId(`Close_Button`)
                .setStyle(`DANGER`)
                .setLabel("Close")
                .setDisabled(false),
              claimButton,
              new MessageButton()
                .setCustomId(`TransScript_${supportteam2}`)//تعديل
                .setStyle(`SECONDARY`)
                .setLabel("TransScript")
                .setDisabled(true)
            ]);
  
          const notclimed = new Discord.MessageEmbed()
            .setColor(`WHITE`)
            .setDescription(`***تم الغاء استلام التذكره***\n**بواسطه : <@${i.user.id}>**`)
  
          ticketDB2.delete(`climedBy_${client.user.id}_${i.channel.id}`)
  
          const defaultPermissions = i.channel.permissionOverwrites.cache.find(overwrite => overwrite.id === member.id);
          const climerPermissions = i.channel.permissionOverwrites.cache.find(overwrite => overwrite.id === climer);
          defaultPermissions ? defaultPermissions.delete() : null;
          climerPermissions ? climerPermissions.delete() : null;
          
          i.update({ components: [Ticketbuttons] }).then(async doneclaimed => {
            const ticketchannel1 = i.channel.id;
            const claimedchannel = client.channels.cache.get(ticketchannel1);
            claimedchannel.send({ embeds: [notclimed] })
          })
        })
      }
    }
  } catch (error) {
    console.log(error.message)
  }

})