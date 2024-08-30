const Discord = require ('discord.js')
const { MessageEmbed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database.json")


module.exports = {
  name: "rautoline",
  aliases: ["",""],
  description: "", 
  usage: [""], 
  botPermission: [""], 
  authorPermission: ["ADMINISTRATOR"], 
  cooldowns: [], 
  ownerOnly: false,
  run: async (client, message, args, config) => {

    const embed1 = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setDescription(`❌ __**Please Mention/ID Channel**__`)
    const embed2 = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setDescription(`❌ __**The channel must be Text Channel**__`)
    const embed3 = new Discord.MessageEmbed()
    .setColor(`YELLOW`)
    .setDescription(`❗ __**This is not Autoline Channel!**__`)

    let channel = message.content.split(' ').slice(1)[0]
    
    if (!channel) return message.reply({embeds: [embed1]});
    
    channel = message.mentions.channels.first() || message.guild.channels.cache.get(channel)
    
    if (channel.type !== 'GUILD_TEXT') return message.reply({embeds: [embed2]});
    
    const data = db.get(`autoline_${message.guild.id}`) || []
    
    const c = data.filter(c => c === channel.id).map(c=>c)
    
    if (c.length === 0) return message.reply({embeds: [embed3]});
    
    c.forEach(d => {
    
    const index = data.indexOf(d)
    
    data.splice(index,1)
    
    })
    db.delete(`autoline_${message.guild.id}`)
    
    message.reply(`Done ✅\nChannel: ${channel}`)
  } }
