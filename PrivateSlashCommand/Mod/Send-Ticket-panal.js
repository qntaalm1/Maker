const {MessageActionRow, MessageButton, MessageEmbed  } = require("discord.js");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders")
const { ChannelType } = require("discord-api-types/v9");
const { Database } = require("st.db")
const BOTMAKERDB = new Database("/Json-db/BOTMAKERDB");
const ticketDB = new Database("/Ticket-DB/TicketDB.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`send-ticket-panal`)
        .setDescription(`Send the ticket panal`),
    botPermission: [""],
    authorPermission: ["ADMINISTRATOR"],
    ownerOnly: false,
    async run(client, interaction) {
        await interaction.deferReply({ ephemeral: true });
        try {
            const data = ticketDB.get(`TicketSystem_${interaction.guild.id}`)
            const channel = data.channel
            const message = data.message
            const buttonname1 = data.buttonname1
            const buttonname2 = data.buttonname2
            const buttonstatus1 = data.buttonstatus1
            const buttonstatus2 = data.buttonstatus2
            const buttoncolor1 = data.color1
            const buttoncolor2 = data.color2
            const emoji1 = data.emoji1
            const emoji2 = data.emoji2

            const ticketchannel = client.channels.cache.get(channel)
            const TicketEmbed = new Discord.MessageEmbed()
                .setColor(interaction.guild.me.displayHexColor)
                .setDescription(`${message}`)

            const oldticketcheck = ticketDB.get(`TicketpanalMsg_${interaction.guild.id}`)
            const fetchedMessage = await ticketchannel.messages.fetch(oldticketcheck).catch(async (error) => {
                return console.log(error.message);
            });
            if (fetchedMessage) {
                fetchedMessage.delete();
            }

            const Ticketbuttons = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setCustomId(`Button1_${interaction.guild.id}`)
                        .setStyle(buttoncolor1)
                        .setEmoji(`${emoji1}` ? emoji1 : null)
                        .setLabel(`${buttonname1}`)
                        .setDisabled(buttonstatus1),
                    new MessageButton()
                        .setCustomId(`Button2_${interaction.guild.id}`)
                        .setStyle(buttoncolor2)
                        .setEmoji(`${emoji2}` ? emoji2 : null)
                        .setLabel(`${buttonname2}`)
                        .setDisabled(buttonstatus2)
                ]);

            ticketchannel.send({ embeds: [TicketEmbed], components: [Ticketbuttons] }).then(async msg => {
                ticketDB.set(`TicketpanalMsg_${interaction.guild.id}`, msg.id)
                interaction.editReply(`Done!!`)
            })
        } catch (error) {
            console.log(error)
            await interaction.editReply(`حدث خطا`)
        }
    },
};
