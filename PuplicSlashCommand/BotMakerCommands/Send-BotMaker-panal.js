const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require("discord.js");
const { Database } = require("st.db");
const config = require("../../config.json");
const owners = require("../../config");

const BOTMAKERDB = new Database("/Json-db/BOTMAKERDB");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send-botmaker-panel")
    .setDescription("Send BotMaker panel"),
  botPermission: [],
  authorPermission: ["ADMINISTRATOR"],
  ownerOnly: false,
  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    try {
        const data = BOTMAKERDB.get(`BotMakerTicket_${interaction.guild.id}`);
        const Message = data.Message;
        const channelID = data.Channel;

        const oldmsg = BOTMAKERDB.get(`BOTMAKERTicketMSGID_${interaction.guild.id}`);
        const channel = client.channels.cache.get(channelID);

        if (!channel)
          return interaction.editReply({ content: "**لم يتم تحديد روم التكت.**" });

        const Bot_Embed = new MessageEmbed()
          .setColor(interaction.guild.me.displayHexColor)
          .setDescription(`${Message}`);

        const Bot_Selector = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("BOTMAKER_Selector")
            .setPlaceholder("Make your bot from here!")
            .setOptions([
              {
                label: "Probot tax",
                value: "Tax_Selected",
                description: "To create new Auto tax bot",
              },
              {
                label: "TEST",
                value: "TEST_Selected",
                description: "To create TEST",
              },
              {
                label: "Reset",
                value: "Reset_Selected",
                description: "To Reset the menu",
              },
            ])
        );

        if (data.Message) {
          channel.send({ embeds: [Bot_Embed], components: [Bot_Selector] }).then((msg) => {
            BOTMAKERDB.set(`BOTMAKERTicketMSGID_${interaction.guild.id}`, msg.id);
            interaction.editReply({ content: "BotMaker panel has been sent!" });
          });
        } else {
          channel.send({ components: [Bot_Selector] }).then((msg) => {
            BOTMAKERDB.set(`BOTMAKERTicketMSGID_${interaction.guild.id}`, msg.id);
            interaction.editReply({ content: "BotMaker panel has been sent!" });
          });
        }
    } catch (error) {
      console.log(error);
      await interaction.editReply("حدث خطأ.");
    }
  },
};
