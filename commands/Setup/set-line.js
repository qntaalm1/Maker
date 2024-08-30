const Discord = require ('discord.js')
const { MessageEmbed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database.json")


module.exports = {
  name: "set-line",
  aliases: ["",""],
  description: "", 
  usage: [""], 
  botPermission: [""], 
  authorPermission: ["ADMINISTRATOR"], 
  cooldowns: [], 
  ownerOnly: false,
  run: async (client, message, args, config) => {
    const line = message.content.split(' ').slice(1)[0]
    const validateURL = require('url-validation')
    
    const embed1 = new Discord.MessageEmbed()
    .setColor(`YELLOW`)
    .setDescription(`❗  __**Put line Url !**__`)
    const embed2 = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setDescription(`❌ __**Invalid line Url!**__`)


  if (!line) return message.reply({embeds: [embed1]});

  

  if (!validateURL(line)) return message.reply({embeds: [embed2]});

  

  db.set(`line_${message.guild.id}`,line)

  

  message.reply(`Done ✅\nLine: ${line}`);
  } }
